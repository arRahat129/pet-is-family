"use client";

import { authClient } from '@/lib/auth-client';
import { Button, Card, FieldError, Input, Label, Separator, TextField } from '@heroui/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';

const SignInPage = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const validatePassword = (password) => {
        if (password.length < 6) return "Password must be at least 6 characters";
        if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter";
        if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter";
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const { email, password } = Object.fromEntries(formData.entries());

        const passwordError = validatePassword(password);
        if (passwordError) {
            setError(passwordError);
            setLoading(false);
            return;
        }

        const { data, error } = await authClient.signIn.email({
            email,
            password,
        });

        if (data) {
            toast.success(`Sign In Successfully! -> Welcome: ${data?.user?.name}`);
            redirect('/');
        }

        if (error) {
            toast.error(`An Unexpected Error Occurred! || ${error?.message}`);
            setLoading(false);
            return;
        }

        setLoading(false);
    };

    const handleGoogleSignIn = async () => {
        await authClient.signIn.social({
            provider: "google"
        });
    };

    return (
        <div className="max-w-7xl mx-auto py-10">
            <Card className="border max-w-md mx-auto p-6 rounded-2xl bg-white dark:bg-neutral-950 dark:border-neutral-800">

                <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
                    Welcome Back
                </h1>

                {error && (
                    <p className="text-red-500 text-sm mb-4 text-center">
                        {error}
                    </p>
                )}

                <form className="space-y-5" onSubmit={onSubmit}>

                    <TextField name="email" type="email" isRequired>
                        <Label className="dark:text-white">Email</Label>
                        <Input placeholder="Enter email" />
                        <FieldError />
                    </TextField>

                    <TextField name="password" type="password" isRequired>
                        <Label className="dark:text-white">Password</Label>
                        <Input type="password" placeholder="Create password" />
                        <FieldError />
                    </TextField>

                    <Button
                        type="submit"
                        className="w-full bg-green-600 text-white rounded-xl"
                        isDisabled={loading}
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </Button>
                </form>

                <p className="text-center text-sm mt-4 text-gray-600 dark:text-gray-400">
                    Don't have an account?{" "}
                    <Link href={'/signup'}>
                        <span className="text-green-700 font-medium cursor-pointer">
                            Register Now
                        </span>
                    </Link>
                </p>

                <div className='flex justify-center items-center gap-3 my-4'>
                    <Separator />
                    <p className='whitespace-nowrap dark:text-gray-400'>or</p>
                    <Separator />
                </div>

                <Button
                    onClick={handleGoogleSignIn}
                    variant='outline'
                    className='w-full rounded-xl dark:bg-neutral-900 dark:border-neutral-800'
                >
                    <FcGoogle /> Sign In with Google
                </Button>

            </Card>
        </div>
    );
};

export default SignInPage;