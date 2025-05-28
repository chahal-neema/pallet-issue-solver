
import React, { useState } from 'react';
import IssueTable from './IssueTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface IssuesPanelProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const IssuesPanel = ({ activeTab, onTabChange }: IssuesPanelProps) => {
  const [newItemValue, setNewItemValue] = useState('');

  const notIdentifiedIssues = [
    { id: 1, sku: '4248555074', serial: '', actions: ['Undo'] },
    { id: 2, sku: '', serial: '', actions: ['Remove contour'] },
    { id: 3, sku: '', serial: '', actions: ['Remove contour'] }
  ];

  const duplicateIssues = [
    { id: 13, sku: 'BEEF123', serial: '123456', isDuplicate: true, actions: ['Keep', 'Delete'], isPrimary: true },
    { id: 22, sku: 'BEEF123', serial: '123456', isDuplicate: true, actions: ['Keep', 'Delete'] },
    { id: 31, sku: 'PORK456', serial: '789012', isDuplicate: true, actions: ['Keep', 'Delete'] },
    { id: 45, sku: 'PORK456', serial: '789012', isDuplicate: true, actions: ['Keep', 'Delete'] }
  ];

  const mismatchIssues = [
    { id: 8, sku: 'BEEF123', serial: '1008807618-424592', expected: '1008807618-424599', actions: ['Fix', 'Flag'] }
  ];

  const missingIssues = [
    { id: 6, sku: 'BEEF123', serial: '1008807618', actions: ['Add case'] },
    { id: 7, sku: 'BEEF123', serial: '1008807618', actions: ['Add case'] }
  ];

  const handleAddItem = () => {
    if (newItemValue.trim()) {
      console.log('Adding item:', newItemValue);
      setNewItemValue('');
    }
  };

  return (
    <div className="w-3/5 p-6 overflow-y-auto bg-white">
      <div className="flex gap-1 mb-6">
        <button
          onClick={() => onTabChange('issues')}
          className={`px-4 py-2 rounded-t-lg text-sm font-medium border-b-2 ${
            activeTab === 'issues'
              ? 'bg-red-500 text-white border-red-500'
              : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'
          }`}
        >
          Issues
        </button>
        <button
          onClick={() => onTabChange('auto-verified')}
          className={`px-4 py-2 rounded-t-lg text-sm font-medium border-b-2 ${
            activeTab === 'auto-verified'
              ? 'bg-red-500 text-white border-red-500'
              : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'
          }`}
        >
          Auto-Verified
        </button>
      </div>

      {activeTab === 'issues' && (
        <div className="space-y-6">
          <IssueTable
            title="Not Identified Issues"
            count={3}
            description="Enter or Scan the SKU number."
            issues={notIdentifiedIssues}
            type="not-identified"
          />

          <div className="space-y-3">
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Extra Issues</h3>
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm font-medium">
                2 Issues ▲
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-4">Confirm, edit or delete extra items.</p>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
              <IssueTable
                title=""
                count={0}
                description=""
                issues={[{ id: 4, sku: 'BEEF123', serial: '1008807618-424592', actions: ['Remove contour'] }]}
                type="extra"
                isNested={true}
              />
              <div className="bg-yellow-50 border-t border-yellow-200 px-3 py-2 flex items-center justify-between">
                <span className="text-yellow-800 text-sm flex items-center gap-2">
                  <span className="bg-yellow-200 rounded-full w-4 h-4 flex items-center justify-center text-xs">ⓘ</span>
                  We found 7 out 5 expected cases. Review other verified cases.
                </span>
                <button className="text-red-600 text-xs font-medium hover:text-red-700">
                  View All ▼
                </button>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
              <IssueTable
                title=""
                count={0}
                description=""
                issues={[{ id: 9, sku: 'CHICKEN789', serial: 'CHK001234', actions: ['Remove contour'] }]}
                type="extra"
                isNested={true}
              />
              <div className="bg-yellow-50 border-t border-yellow-200 px-3 py-2">
                <span className="text-yellow-800 text-sm flex items-center gap-2">
                  <span className="bg-yellow-200 rounded-full w-4 h-4 flex items-center justify-center text-xs">ⓘ</span>
                  Unexpected SKU - not found in WMS
                </span>
              </div>
            </div>
          </div>

          <IssueTable
            title="Duplicates"
            count={4}
            description="Review and resolve duplicate entries."
            issues={duplicateIssues}
            type="duplicates"
          />

          <IssueTable
            title="Field Mismatches"
            count={1}
            description="Items with incorrect field values."
            issues={mismatchIssues}
            type="mismatches"
          />

          <IssueTable
            title="Missing Issues"
            count={2}
            description="Resolve the issues above to auto-resolve missing issues."
            issues={missingIssues}
            type="missing"
          />

          <div className="border-t border-gray-200 pt-4 mt-6">
            <div className="flex items-center justify-between py-3 border-b border-gray-200 mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add Items</h3>
              <span className="text-gray-400 text-sm">▲</span>
            </div>
            <p className="text-gray-600 text-sm mb-4">You can add unscanned or merged items.</p>
            <div className="flex gap-2">
              <Input
                value={newItemValue}
                onChange={(e) => setNewItemValue(e.target.value)}
                placeholder="Enter or Scan ID"
                className="flex-1"
              />
              <Button 
                onClick={handleAddItem}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                + Add
              </Button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'auto-verified' && (
        <div className="text-center py-12 text-gray-500">
          <p>Auto-verified items will be displayed here.</p>
        </div>
      )}
    </div>
  );
};

export default IssuesPanel;
