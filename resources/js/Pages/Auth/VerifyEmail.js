import React from 'react';
import Button from '@/Components/Button';
import Guest from '@/Layouts/Guest';
import { Head, Link, useForm } from '@inertiajs/inertia-react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm();

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <Guest>
            <Head title="Email Verification" />

            <div className="mb-4 text-sm text-gray-600">
            Thanks for signing up!
            Before getting started, please wait for the admin to verify your email address. Once your email is verified, you'll be able to access your account. If you have any questions, feel free to contact us.
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    A new verification link has been sent to the email address you provided during registration.
                </div>
            )}

            {/* <form onSubmit={submit}> */}
                <div className="mt-4 flex items-center justify-between">
                    {/* <Button processing={processing}>Resend Verification Email</Button> */}

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="underline text-sm text-gray-600 hover:text-gray-900"
                    >
                        Log Out
                    </Link>
                </div>
            {/* </form> */}
        </Guest>
    );
}
