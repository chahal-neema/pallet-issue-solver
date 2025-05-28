
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PalletHeaderProps {
  palletData: {
    id: string;
    station: string;
    date: string;
    time: string;
    status: string;
    counts: {
      notIdentified: number;
      extra: number;
      missing: number;
      confirmed: number;
    };
  };
  onFinish: () => void;
}

const PalletHeader = ({ palletData, onFinish }: PalletHeaderProps) => {
  return (
    <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-900 font-semibold">
            <ArrowLeft className="h-4 w-4" />
            <span>Pallet {palletData.id} - {palletData.station} - {palletData.date} ({palletData.time})</span>
          </div>
          <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
            {palletData.status}
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex gap-3 text-sm">
            <div className="bg-red-100 text-red-800 px-2 py-1 rounded font-medium">
              {palletData.counts.notIdentified} Not identified
            </div>
            <div className="bg-orange-100 text-orange-800 px-2 py-1 rounded font-medium">
              {palletData.counts.extra} Extra
            </div>
            <div className="bg-green-100 text-green-800 px-2 py-1 rounded font-medium">
              {palletData.counts.missing} Missing
            </div>
            <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded font-medium">
              {palletData.counts.confirmed} Confirmed Cases
            </div>
          </div>
          
          <Button 
            onClick={onFinish}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Finish Verification
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PalletHeader;
