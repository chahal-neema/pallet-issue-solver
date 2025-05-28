
import React, { useState } from 'react';
import PalletHeader from './PalletHeader';
import ImagePanel from './ImagePanel';
import IssuesPanel from './IssuesPanel';

const PalletVerification = () => {
  const [activeTab, setActiveTab] = useState('issues');
  const [showContours, setShowContours] = useState(false);
  const [activeFace, setActiveFace] = useState('Left');

  const palletData = {
    id: '8485794',
    station: 'Station 1',
    date: '2024-09-16',
    time: '13:23',
    status: 'In Progress',
    counts: {
      notIdentified: 3,
      extra: 7,
      missing: 2,
      confirmed: 22
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <PalletHeader 
          palletData={palletData}
          onFinish={() => console.log('Finish verification')}
        />
        
        <div className="flex h-[600px]">
          <ImagePanel
            showContours={showContours}
            activeFace={activeFace}
            onToggleContours={() => setShowContours(!showContours)}
            onFaceChange={setActiveFace}
          />
          
          <IssuesPanel
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>
      </div>
    </div>
  );
};

export default PalletVerification;
