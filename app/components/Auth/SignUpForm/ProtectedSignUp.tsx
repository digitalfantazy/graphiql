'use client';

import ProtectedRoute from '../ProtectRoutes/ProtectedRoute';
import SignUpForm from './SignUpForm';

export default ProtectedRoute(SignUpForm, 'withoutAuth');
