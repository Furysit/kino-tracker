import { Button } from "antd";
import { List, Grid3X3 } from "lucide-react";


export function ViewToggle({ viewMode, onViewModeChange }) {
  return (
    <div className="flex gap-2 bg-gray-950/40 border border-slate-600 rounded-xl p-1">
      <Button
        size="medium"
        onClick={() => onViewModeChange('grid')}
        className={`flex items-center gap-2 ${
          viewMode === 'grid' 
            ? '!bg-[#e4b86c] !border-[#e4b86c] !text-slate-900 !font-semibold' 
            : '!bg-transparent !border-slate-500 !text-gray-300'
        }`}
      >
        <Grid3X3 className="w-4 h-4" />
        Grid
      </Button>
      <Button
        size="medium"
        onClick={() => onViewModeChange('list')}
        className={`flex items-center gap-2 ${
          viewMode === 'list' 
            ? '!bg-[#e4b86c] !border-[#e4b86c] !text-slate-900 !font-semibold' 
            : '!bg-transparent !border-slate-500 !text-gray-300'
        }`}
      >
        <List className="w-4 h-4" />
        List
      </Button>
    </div>
  );
}