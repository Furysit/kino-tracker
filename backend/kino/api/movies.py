from flask import Blueprint, jsonify, request
from bson import ObjectId
from kino import db
from kino.api.user import token_required

movies_bp = Blueprint("movies", __name__, url_prefix="/api")
titles_collection = db.titles

def serialize_title(doc):
    return {
        "id": str(doc["_id"]),
        "title": doc.get("title"),
        "poster": doc.get("poster"),
        "evanRating": int(doc.get("evanRating", 0)),
        "furyRating": int(doc.get("furyRating", 0)),
        "year": int(doc.get("year", 0)),
        "runtime": int(doc.get("runtime", 0)),
        "genre": doc.get("genre"),
        "watchedDate": doc.get("watchedDate"),
    }

@movies_bp.route("/movies")
def get_movies():
    page = int(request.args.get("page", 1))
    per_page = int(request.args.get("per_page", 10))
    skip = (page-1) * per_page
    
    cursor = titles_collection.find().sort("watchedDate", -1).skip(skip).limit(per_page)
    titles = [serialize_title(doc) for doc in cursor]

    total = titles_collection.count_documents({})
    total_pages = (total + per_page - 1) // per_page
    return jsonify({
        "movies": titles,
        "page": page,
        "total_pages": total_pages,
        "total": total
    })


@token_required
@movies_bp.route("/search_movie", methods=["GET"])
def search():
    page = int(request.args.get("page", 1))
    per_page = int(request.args.get("per_page", 10))
    skip = (page-1) * per_page
    query = request.args.get("query", "").strip()

    try:
        filters = []
        if query:
            filters.append({"title": {"$regex": query, "$options": "i"}})
            filters.append({"genre": {"$regex": query, "$options": "i"}})

            if query.isdigit():
                filters.append({"year": int(query)})
                filters.append({"runtime": int(query)})

            from datetime import datetime
            try:
                date = datetime.strptime(query, "%Y-%m-%d").strftime("%Y-%m-%d")
                filters.append({"watchedDate": date})
            except ValueError:
                pass

        search_filter = {"$or": filters} if filters else {}

        cursor = titles_collection.find(search_filter).sort("watchedDate", -1).skip(skip).limit(per_page)
        titles = [serialize_title(doc) for doc in cursor]

        total_search = titles_collection.count_documents(search_filter)
        total_pages = (total_search + per_page - 1) // per_page

        return jsonify({
            "movies": titles,
            "page": page,
            "total_pages": total_pages,
            "total": total_search
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@token_required
@movies_bp.route("/addMovie", methods = ["POST"])
def add_movie():
    data = request.get_json()
    
    if not data:
        return jsonify({"error": "Missing required fields"}), 400

    new_doc = {
        "title": data.get("title"),
        "poster": data.get("poster"),
        "evanRating": data.get("evanRating", 0),
        "furyRating": data.get("furyRating", 0),
        "year": data.get("year"),
        "runtime": data.get("runtime"),
        "genre": data.get("genre"),
        "watchedDate": data.get("watchedDate"),
    }

    result = titles_collection.insert_one(new_doc)
    new_doc["id"] = str(result.inserted_id)
    return jsonify(new_doc), 201


@token_required
@movies_bp.route("/deleteMovie", methods=["DELETE"])
def delete_movie():
    data = request.json
    if "id" not in data:
        return jsonify({"error": "Missing id"}), 400
    try:
        title_to_delete = {"_id": ObjectId(data.get("id"))}
        result = titles_collection.delete_one(title_to_delete)
        if result.deleted_count == 0:
            return jsonify({"Error": "Movie not found"}), 404
        return jsonify({"Succes": True}), 200
    except Exception as e:
        return jsonify({"Error" : str(e) }), 500
