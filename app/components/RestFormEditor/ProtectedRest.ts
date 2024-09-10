'use client';

import ProtectedRoute from '../Auth/ProtectRoutes/ProtectedRoute';
import RestFormEditor from './RestFormEditor';

export default ProtectedRoute(RestFormEditor, 'withAuth');
