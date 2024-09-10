'use client';

import ProtectedRoute from '../Auth/ProtectRoutes/ProtectedRoute';
import GraphiQLFormEditor from './GraphiQLFormEditor';

export default ProtectedRoute(GraphiQLFormEditor, 'withAuth');
