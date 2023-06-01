import React, { useState } from 'react';
import { firebaseApp } from '../firebase/app';

import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useAuthState, useSignInWithGoogle, useSignOut } from 'react-firebase-hooks/auth';
const auth = getAuth(firebaseApp);

const LoginModal = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const [signOut,signoutLoading] = useSignOut(auth);

    if (error) {
        return (
            <div>
                <p>Error: {error.message}</p>
            </div>
        );
    }
    if (loading) {
        return <p>Loading...</p>;
    }
    if (user) {
        return (
            <div className='ml-0 pl-0'>
                <div className="dropdown dropdown-end justify-end">
                    <div tabIndex={0} className="avatar justify-end">
                        <div className="w-1/3 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={user.user.photoURL} />
                        </div>
                    </div>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>{user.user.displayName}</a></li>
                        <li><a className='text-sm'>{user.user.email}</a></li>
                        <li><a><button onClick={async () => {
                            const success = await signOut();
                            if (success) {
                                alert('You are sign out');
                            }
                        }}>Log out</button></a></li>
                    </ul>
                </div>
            </div>
        );
    }
    return (
        <div className="App">
            <button onClick={() => signInWithGoogle()}>Sign In</button>
        </div>
    );
};
export default LoginModal;
