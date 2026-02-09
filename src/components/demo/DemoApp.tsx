'use client';

import { useReducer, useCallback, useState } from 'react';
import type { DemoState, DemoAction, CriteriaWeights } from '@/types/demo';
import { defaultWeights } from '@/data/demo-criteria';
import DemoHeader from './DemoHeader';
import DemoSidebar from './DemoSidebar';
import ImportOverlay from './ImportOverlay';
import DashboardView from './dashboard/DashboardView';
import ProjectDetailView from './dashboard/ProjectDetailView';
import TenderListView from './tenders/TenderListView';
import TenderDetailView from './tenders/TenderDetailView';

const initialState: DemoState = {
  view: 'dashboard',
  selectedProjectId: null,
  selectedTenderId: null,
  projectsImported: false,
  criteriaWeights: defaultWeights,
  generatedContent: {},
};

function demoReducer(state: DemoState, action: DemoAction): DemoState {
  switch (action.type) {
    case 'NAVIGATE_DASHBOARD':
      return { ...state, view: 'dashboard', selectedProjectId: null };
    case 'NAVIGATE_TENDERS':
      return { ...state, view: 'tenders', selectedTenderId: null };
    case 'SELECT_PROJECT':
      return { ...state, view: 'project_detail', selectedProjectId: action.projectId };
    case 'SELECT_TENDER':
      return { ...state, view: 'tender_detail', selectedTenderId: action.tenderId };
    case 'IMPORT_COMPLETE':
      return { ...state, projectsImported: true };
    case 'UPDATE_WEIGHTS':
      return { ...state, criteriaWeights: action.weights };
    case 'GENERATE_CONTENT': {
      const prev = state.generatedContent[action.tenderId] ?? new Set<string>();
      const next = new Set(prev);
      next.add(action.contentId);
      return {
        ...state,
        generatedContent: { ...state.generatedContent, [action.tenderId]: next },
      };
    }
    default:
      return state;
  }
}

export default function DemoApp() {
  const [state, dispatch] = useReducer(demoReducer, initialState);
  const [showImport, setShowImport] = useState(false);

  const handleImport = useCallback(() => {
    setShowImport(true);
  }, []);

  const handleImportComplete = useCallback(() => {
    setShowImport(false);
    dispatch({ type: 'IMPORT_COMPLETE' });
  }, []);

  const handleUpdateWeights = useCallback((weights: CriteriaWeights) => {
    dispatch({ type: 'UPDATE_WEIGHTS', weights });
  }, []);

  const handleGenerateContent = useCallback((tenderId: string, contentId: string) => {
    dispatch({ type: 'GENERATE_CONTENT', tenderId, contentId });
  }, []);

  const renderContent = () => {
    switch (state.view) {
      case 'dashboard':
        return (
          <DashboardView
            imported={state.projectsImported}
            onSelectProject={(id) => dispatch({ type: 'SELECT_PROJECT', projectId: id })}
          />
        );
      case 'project_detail':
        return (
          <ProjectDetailView
            projectId={state.selectedProjectId!}
            onBack={() => dispatch({ type: 'NAVIGATE_DASHBOARD' })}
          />
        );
      case 'tenders':
        return (
          <TenderListView
            weights={state.criteriaWeights}
            onUpdateWeights={handleUpdateWeights}
            onSelectTender={(id) => dispatch({ type: 'SELECT_TENDER', tenderId: id })}
          />
        );
      case 'tender_detail':
        return (
          <TenderDetailView
            tenderId={state.selectedTenderId!}
            generatedContent={state.generatedContent[state.selectedTenderId!] ?? new Set()}
            onBack={() => dispatch({ type: 'NAVIGATE_TENDERS' })}
            onGenerate={(contentId) =>
              handleGenerateContent(state.selectedTenderId!, contentId)
            }
            weights={state.criteriaWeights}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen flex-col bg-apple-gray-50 overflow-hidden">
      <DemoHeader view={state.view} state={state} dispatch={dispatch} />

      <div className="flex flex-1 overflow-hidden">
        <DemoSidebar
          view={state.view}
          imported={state.projectsImported}
          onNavigate={(view) => {
            if (view === 'dashboard') dispatch({ type: 'NAVIGATE_DASHBOARD' });
            else dispatch({ type: 'NAVIGATE_TENDERS' });
          }}
          onImport={handleImport}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl p-6">
            {renderContent()}
          </div>
        </main>
      </div>

      {showImport && <ImportOverlay onComplete={handleImportComplete} />}
    </div>
  );
}
