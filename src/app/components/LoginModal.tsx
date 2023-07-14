import { auth } from '../firebase/app';
import Image from 'next/image';
import { useAuthState, useSignInWithGoogle, useSignOut } from 'react-firebase-hooks/auth';
const LoginModal = () => {
    const [user, loading, error] = useAuthState(auth);
    const [signInWithGoogle] = useSignInWithGoogle(auth);
    const [signOut] = useSignOut(auth);

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
                        <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <Image
                                src={user.photoURL || ""}
                                width={400}
                                height={400}
                                alt="Picture of the author"
                            />
                        </div>
                    </div>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>{user.displayName}</a></li>
                        <li><a className='text-sm'>{user.email}</a></li>
                        <li><a><button onClick={signOut}>Log out</button></a></li>
                    </ul>
                </div>
            </div>
        );
    }
    return (
        <div className="App">
            <button className="btn btn-sm btn-ghost"
                onClick={() => signInWithGoogle()}
            >
                Sign In
            </button>
        </div>
    );
};
export default LoginModal;
