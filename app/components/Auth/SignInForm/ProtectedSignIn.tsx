'use client';

import ProtectedRoute from '../ProtectRoutes/ProtectedRoute';
import SignInForm from './SignInForm';

export default ProtectedRoute(SignInForm, 'withoutAuth');
