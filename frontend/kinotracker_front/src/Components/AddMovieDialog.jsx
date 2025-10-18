import { useState } from "react";
import { Button, Input, Select, Modal, Form, DatePicker } from "antd";
import { PlusOutlined } from "@ant-design/icons";
const { Option } = Select;

export function AddMovieDialog({ onAddMovie }) {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  
  const genres = [
    'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary',
    'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller'
  ];

  const handleSubmit = (values) => {
    if (!values.title || !values.genre) return;

    onAddMovie({
      ...values,
      year: values.year || new Date().getFullYear(),
      furyRating: values.furyRating || 5,
      evanRating: values.evanRating || 5,
      runtime: values.runtime || 120,
      watchedDate: values.watchedDate ? values.watchedDate.format('YYYY-MM-DD') : new Date().toISOString().split('T')[0],
      poster: values.poster || 'https://avatars.mds.yandex.net/i?id=9f8661325110a587e8778f1215d84d82_l-5870056-images-thumbs&n=13'
    });

    form.resetFields();
    setOpen(false);
  };

  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
  };

  return (
    <>
      <Button 
        type="primary" 
        icon={<PlusOutlined />} 
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 custom-movie-button"
      >
        Add Movie
      </Button>
      
      <Modal
        title="Add New Movie"
        open={open}
        onCancel={handleCancel}
        footer={null}
        width={500}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            year: new Date().getFullYear(),
            furyRating: 5,
            evanRating: 5,
            runtime: 120,
            watchedDate: null
          }}
        >
          <Form.Item
            label="Movie Title"
            name="title"
            rules={[{ required: true, message: 'Please enter movie title' }]}
          >
            <Input placeholder="Enter movie title..." />
          </Form.Item>
          
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="Year"
              name="year"
            >
              <Input 
                type="number"
                min="1900"
                max={new Date().getFullYear() + 5}
              />
            </Form.Item>
            
            <Form.Item
              label="Runtime (min)"
              name="runtime"
            >
              <Input 
                type="number"
                min="1"
              />
            </Form.Item>
          </div>

          <Form.Item
            label="Genre"
            name="genre"
            rules={[{ required: true, message: 'Please select a genre' }]}
          >
            <Select placeholder="Select a genre">
              {genres.map((genre) => (
                <Option key={genre} value={genre}>
                  {genre}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="Fury's Rating (1-10)"
              name="furyRating"
            >
              <Input
                type="number"
                min="1"
                max="10"
                step="1"
              />
            </Form.Item>
            
            <Form.Item
              label="Evan's Rating (1-10)"
              name="evanRating"
            >
              <Input
                type="number"
                min="1"
                max="10"
                step="1"
              />
            </Form.Item>
          </div>

          <Form.Item
            label="Watched Date"
            name="watchedDate"
          >
            <DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Poster URL (optional)"
            name="poster"
          >
            <Input placeholder="https://example.com/poster.jpg" />
          </Form.Item>

          <div className="flex justify-end gap-2 pt-4">
            <Button onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Add Movie
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}