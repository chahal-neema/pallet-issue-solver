
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Issue {
  id: number;
  sku: string;
  serial: string;
  isDuplicate?: boolean;
  isPrimary?: boolean;
  expected?: string;
  actions: string[];
}

interface IssueTableProps {
  title: string;
  count: number;
  description: string;
  issues: Issue[];
  type: 'not-identified' | 'extra' | 'duplicates' | 'mismatches' | 'missing';
  isNested?: boolean;
}

const IssueTable = ({ title, count, description, issues, type, isNested = false }: IssueTableProps) => {
  const [issueData, setIssueData] = useState(issues);

  const updateIssue = (id: number, field: 'sku' | 'serial', value: string) => {
    setIssueData(prev => 
      prev.map(issue => 
        issue.id === id ? { ...issue, [field]: value } : issue
      )
    );
  };

  const handleAction = (issueId: number, action: string) => {
    console.log(`Action ${action} for issue ${issueId}`);
  };

  if (!isNested && title) {
    return (
      <div className="mb-6">
        <div className="flex items-center justify-between py-3 border-b border-gray-200 mb-3">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm font-medium">
            {count} Issues ▲
          </span>
        </div>
        {description && (
          <p className="text-gray-600 text-sm mb-4">{description}</p>
        )}
        
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Case ID</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase">SKU</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Serial</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {issueData.map((issue, index) => (
                <tr key={issue.id} className={index !== issueData.length - 1 ? 'border-b border-gray-100' : ''}>
                  <td className="px-3 py-3 bg-gray-50 text-sm font-semibold text-gray-700">
                    {issue.id}
                  </td>
                  <td className="px-3 py-3">
                    <Input
                      value={issue.sku}
                      onChange={(e) => updateIssue(issue.id, 'sku', e.target.value)}
                      placeholder={type === 'not-identified' ? 'Enter or Scan ID' : 'SKU'}
                      className="w-full"
                    />
                  </td>
                  <td className="px-3 py-3">
                    <Input
                      value={issue.serial}
                      onChange={(e) => updateIssue(issue.id, 'serial', e.target.value)}
                      placeholder="Enter Serial"
                      className={`w-full ${
                        issue.isDuplicate || issue.expected ? 'border-red-300 bg-red-50' : ''
                      }`}
                    />
                    {issue.isDuplicate && (
                      <div className="text-red-600 text-xs mt-1 font-medium">
                        [Duplicate Serial]
                      </div>
                    )}
                    {issue.expected && (
                      <div className="text-red-600 text-xs mt-1 font-medium">
                        Expected: {issue.expected}
                      </div>
                    )}
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex gap-1">
                      {issue.actions.map((action) => (
                        <Button
                          key={action}
                          variant={
                            (action === 'Keep' && issue.isPrimary) ? 'destructive' : 'outline'
                          }
                          size="sm"
                          onClick={() => handleAction(issue.id, action)}
                          className="text-xs"
                        >
                          {action}
                        </Button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Nested table for extra issues
  return (
    <table className="w-full">
      <thead>
        <tr className="bg-gray-50">
          <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Case ID</th>
          <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase">SKU</th>
          <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Serial</th>
          <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
        </tr>
      </thead>
      <tbody>
        {issueData.map((issue, index) => (
          <tr key={issue.id} className={index !== issueData.length - 1 ? 'border-b border-gray-100' : ''}>
            <td className="px-3 py-3 bg-gray-50 text-sm font-semibold text-gray-700">
              {issue.id}
            </td>
            <td className="px-3 py-3">
              <Input
                value={issue.sku}
                onChange={(e) => updateIssue(issue.id, 'sku', e.target.value)}
                className="w-full"
              />
            </td>
            <td className="px-3 py-3">
              <Input
                value={issue.serial}
                onChange={(e) => updateIssue(issue.id, 'serial', e.target.value)}
                className="w-full"
              />
            </td>
            <td className="px-3 py-3">
              <div className="flex gap-1">
                {issue.actions.map((action) => (
                  <Button
                    key={action}
                    variant="outline"
                    size="sm"
                    onClick={() => handleAction(issue.id, action)}
                    className="text-xs"
                  >
                    {action}
                  </Button>
                ))}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default IssueTable;
