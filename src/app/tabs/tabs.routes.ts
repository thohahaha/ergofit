import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('../pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'monitoring',
    loadComponent: () => import('../pages/monitoring/monitoring.component').then((m) => m.MonitoringComponent),
  },
  {
    path: 'analytics',
    loadComponent: () => import('../pages/analytics/analytics.component').then((m) => m.AnalyticsComponent),
  },
  {
    path: 'recommendations',
    loadComponent: () => import('../pages/recommendations/recommendations.component').then((m) => m.RecommendationsComponent),
  },
  {
    path: 'settings',
    loadComponent: () => import('../pages/settings/settings.component').then((m) => m.SettingsComponent),
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
];