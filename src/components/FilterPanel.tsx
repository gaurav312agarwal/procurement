import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FilterState, businessUnits, regions, suppliers, invoiceTypes, dateRanges } from "@/lib/mockData";
import { Calendar, RotateCcw } from "lucide-react";

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export const FilterPanel = ({ filters, onFilterChange }: FilterPanelProps) => {
  const handleChange = (key: keyof FilterState, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const handleReset = () => {
    onFilterChange({
      dateRange: 'Last 30 Days',
      businessUnit: 'All',
      region: 'All',
      supplier: 'All',
      invoiceType: 'All'
    });
  };

  return (
    <div className="dashboard-card mb-6">
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[180px]">
          <label className="kpi-label mb-2 block">Date Range</label>
          <Select value={filters.dateRange} onValueChange={(v) => handleChange('dateRange', v)}>
            <SelectTrigger className="bg-secondary border-border">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {dateRanges.map(range => (
                <SelectItem key={range} value={range}>{range}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 min-w-[180px]">
          <label className="kpi-label mb-2 block">Business Unit</label>
          <Select value={filters.businessUnit} onValueChange={(v) => handleChange('businessUnit', v)}>
            <SelectTrigger className="bg-secondary border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {businessUnits.map(bu => (
                <SelectItem key={bu} value={bu}>{bu}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 min-w-[180px]">
          <label className="kpi-label mb-2 block">Region</label>
          <Select value={filters.region} onValueChange={(v) => handleChange('region', v)}>
            <SelectTrigger className="bg-secondary border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {regions.map(region => (
                <SelectItem key={region} value={region}>{region}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 min-w-[180px]">
          <label className="kpi-label mb-2 block">Supplier</label>
          <Select value={filters.supplier} onValueChange={(v) => handleChange('supplier', v)}>
            <SelectTrigger className="bg-secondary border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {suppliers.map(supplier => (
                <SelectItem key={supplier} value={supplier}>{supplier}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 min-w-[180px]">
          <label className="kpi-label mb-2 block">Invoice Type</label>
          <Select value={filters.invoiceType} onValueChange={(v) => handleChange('invoiceType', v)}>
            <SelectTrigger className="bg-secondary border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {invoiceTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={handleReset} 
          variant="outline" 
          className="border-border hover:bg-secondary"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
      </div>
    </div>
  );
};
