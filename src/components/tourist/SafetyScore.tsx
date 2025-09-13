import React, { useState } from 'react';
import { Shield, TrendingUp, TrendingDown } from 'lucide-react';

interface SafetyScoreProps {
  score: number;
  onScoreChange: (score: number) => void;
}

const SafetyScore: React.FC<SafetyScoreProps> = ({ score, onScoreChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempScore, setTempScore] = useState(score);

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 8) return 'bg-green-500';
    if (score >= 6) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getScoreText = (score: number) => {
    if (score >= 8) return 'Excellent';
    if (score >= 6) return 'Good';
    return 'Needs Attention';
  };

  const handleSave = async () => {
    onScoreChange(tempScore);
    setIsEditing(false);
    // Here you would typically call an API to update the score
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Shield className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 ml-3">Safety Score</h3>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          {isEditing ? 'Cancel' : 'Update'}
        </button>
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              How safe do you feel right now? (1-10)
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={tempScore}
              onChange={(e) => setTempScore(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1 (Unsafe)</span>
              <span>10 (Very Safe)</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900">{tempScore}/10</span>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Save Score
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <span className={`text-3xl font-bold ${getScoreColor(score)}`}>{score}/10</span>
                {score >= 7 ? (
                  <TrendingUp className="w-5 h-5 text-green-600" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-600" />
                )}
              </div>
              <p className={`text-sm font-medium ${getScoreColor(score)}`}>
                {getScoreText(score)}
              </p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-300 ${getScoreBackground(score)}`}
              style={{ width: `${(score / 10) * 100}%` }}
            ></div>
          </div>

          <div className="text-xs text-gray-500">
            <p>Last updated: {new Date().toLocaleTimeString()}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SafetyScore;