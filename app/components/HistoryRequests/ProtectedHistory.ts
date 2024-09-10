'use client';

import ProtectedRoute from '../Auth/ProtectRoutes/ProtectedRoute';
import HistoryRequests from './HistoryRequests';

export default ProtectedRoute(HistoryRequests, 'withAuth');
