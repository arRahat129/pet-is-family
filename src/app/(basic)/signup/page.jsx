"use client";

import { authClient } from '@/lib/auth-client';
import { Button, Card, FieldError, Input, Label, Separator, TextField } from '@heroui/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';

const SignUpPage = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const validatePassword = (password) => {
        if (password.length < 6) {
            return "Password must be at least 6 characters";
        }
        if (!/[A-Z]/.test(password)) {
            return "Password must contain at least one uppercase letter";
        }
        if (!/[a-z]/.test(password)) {
            return "Password must contain at least one lowercase letter";
        }
        return;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const userData = Object.fromEntries(formData.entries());

        // console.log(data);
        const { name, email, photo, password, confirmPassword } = userData;

        const passwordError = validatePassword(password);
        if (passwordError) {
            setError(passwordError);
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError("Password and Confirm Password do not match");
            setLoading(false);
            return;
        }

        // console.log({ name, email, photo, password });

        const { data, error } = await authClient.signUp.email({
            email: email,
            password: password,
            name: name,
            image: photo,
        })

        // console.log({ data, error });

        if (data) {
            toast.success(`Sign Up Succesfully! -> ${data?.user?.name} Please Login In to Preceed...`)
            redirect('/signin');
        }
        if (error) {
            toast.error(`An Unexpected Error Occured! || ${error?.message}`)
            setLoading(false);
            return;
        }

        setLoading(false);
    }

    const handleGoogleSignIn = async () => {
        await authClient.signIn.social({
            provider: "google"
        })
    }

    return (
        <div className="max-w-7xl mx-auto py-10">
            <Card className="border max-w-md mx-auto p-6 rounded-2xl">
                <h1 className="text-2xl font-bold text-center mb-4">
                    Create Account
                </h1>

                {
                    error && (
                        <p className="text-red-500 text-sm mb-4 text-center">
                            {error}
                        </p>
                    )
                }

                <form className="space-y-5" onSubmit={onSubmit}>
                    <TextField name="name" type="text" isRequired>
                        <Label>Name</Label>
                        <Input placeholder="Enter your name" />
                        <FieldError />
                    </TextField>

                    <TextField name="email" type="email" isRequired>
                        <Label>Email</Label>
                        <Input placeholder="Enter email" />
                        <FieldError />
                    </TextField>

                    <TextField name="photo" type="url">
                        <Label>Photo URL</Label>
                        <Input placeholder="https://example.com/photo.jpg" />
                        <FieldError />
                    </TextField>

                    <TextField name="password" type="password" isRequired>
                        <Label>Password</Label>
                        <Input type="password" placeholder="Create password" />
                        <FieldError />
                    </TextField>

                    <TextField name="confirmPassword" type="password" isRequired>
                        <Label>Confirm Password</Label>
                        <Input type="password" placeholder="Re-enter password" />
                        <FieldError />
                    </TextField>

                    <Button
                        type="submit"
                        className="w-full bg-green-600 text-white rounded-xl"
                        isDisabled={loading}
                    >
                        {loading ? "Creating..." : "Sign Up"}
                    </Button>
                </form>

                <p className="text-center text-sm my-4 text-gray-600">
                    Already have an account? <Link href={'/signin'}><span className="text-green-700 font-medium cursor-pointer">Login Now!</span></Link>
                </p>

                <div className='flex justify-center items-center gap-3'>
                    <Separator />
                    <p className='whitespace-nowrap'>or</p>
                    <Separator />
                </div>

                <Button onClick={handleGoogleSignIn} variant='outline' className={'w-full rounded-xl'}><FcGoogle /> Sign In with Google</Button>
            </Card>
        </div>
    );
};

export default SignUpPage;