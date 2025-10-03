import Rankings from './Rankings';

import { useState } from 'react';

const TABS = ['My Officials', 'Rankings', 'Polls', 'Calendar', 'Voting'];

export default function App() {
  const [activeTab, setActiveTab] = useState('My Officials');

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="bg-blue-900 text-white p-4 text-center text-2xl font-bold">
        Electorate
      </header>

      <nav className="flex justify-center gap-4 p-4 bg-white shadow">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded ${
              activeTab === tab ? 'bg-blue-900 text-white' : 'bg-gray-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>

      <main className="p-4">
        {activeTab === 'My Officials' && <div>My Officials tab content</div>}
        {activeTab === 'Rankings' && <Rankings />}
        {activeTab === 'Polls' && <div>Polls tab content</div>}
        {activeTab === 'Calendar' && <div>Calendar tab content</div>}
        {activeTab === 'Voting' && <div>Voting tab content</div>}
      </main>
    </div>
  );
}
