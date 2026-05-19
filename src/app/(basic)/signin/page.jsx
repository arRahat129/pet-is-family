"use client";

import { authClient } from '@/lib/auth-client';
import { Button, Card, FieldError, Input, Label, TextField } from '@heroui/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const SignInPage = () => {
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
        const { email, password } = userData;

        const passwordError = validatePassword(password);
        if (passwordError) {
            setError(passwordError);
            setLoading(false);
            return;
        }

        const { data, error } = await authClient.signIn.email({
            email: email,
            password: password,
        })

        // console.log({ data, error });

        if(data){
            toast.success(`Sign In Succesfully! -> Welcome: ${data?.user?.name}`);
            redirect('/');
        }
        if(error){
            toast.error(`An Unexpected Error Occured! || ${error?.message}`)
            setLoading(false);
            return;
        }


        setLoading(false);
    }

    return (
        <div className="max-w-7xl mx-auto py-10">
            <Card className="border max-w-md mx-auto p-6 rounded-2xl">
                <h1 className="text-2xl font-bold text-center mb-6">
                    Welcome Back
                </h1>

                {
                    error && (
                        <p className="text-red-500 text-sm mb-4 text-center">
                            {error}
                        </p>
                    )
                }

                <form className="space-y-5" onSubmit={onSubmit}>

                    <TextField name="email" type="email" isRequired>
                        <Label>Email</Label>
                        <Input placeholder="Enter email" />
                        <FieldError />
                    </TextField>

                    <TextField name="password" type="password" isRequired>
                        <Label>Password</Label>
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

                <p className="text-center text-sm mt-4 text-gray-600">
                    Don't have an account? <Link href={'/signup'}><span className="text-green-700 font-medium cursor-pointer">Register Now</span></Link>
                </p>
            </Card>
        </div>
    );
};

export default SignInPage;