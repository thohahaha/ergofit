import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'dashboard',
        children: [
          {
            path: '',
            loadComponent: () => import('../pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
          }
        ]
      },
      {
        path: 'monitoring',
        children: [
          {
            path: '',
            loadComponent: () => import('../pages/monitoring/monitoring.component').then((m) => m.MonitoringComponent),
          }
        ]
      },
      {
        path: 'analytics',
        children: [
          {
            path: '',
            loadComponent: () => import('../pages/analytics/analytics.component').then((m) => m.AnalyticsComponent),
          }
        ]
      },
      {
        path: 'recommendations',
        children: [
          {
            path: '',
            loadComponent: () => import('../pages/recommendations/recommendations.component').then((m) => m.RecommendationsComponent),
          }
        ]
      },
      {
        path: 'settings',
        children: [
          {
            path: '',
            loadComponent: () => import('../pages/settings/settings.component').then((m) => m.SettingsComponent),
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadComponent: () => import('../pages/profile/profile.component').then((m) => m.ProfileComponent),
          },
          {
            path: 'settings',
            loadComponent: () => import('../pages/profile/profile-settings.component').then((m) => m.ProfileSettingsComponent),
          }
        ]
      },
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
    ]
  },
];