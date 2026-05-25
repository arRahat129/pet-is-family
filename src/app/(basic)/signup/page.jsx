"use client";

import { authClient } from '@/lib/auth-client';
import { Button, Card, FieldError, Input, Label, Separator, TextField } from '@heroui/react';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { motion } from "framer-motion";
import { Eye, EyeSlash } from '@gravity-ui/icons';

const SignUpPage = () => {
    const router = useRouter();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

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
        const { name, email, photo, password, confirmPassword } =
            Object.fromEntries(formData.entries());

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

        const { data, error } = await authClient.signUp.email({
            email,
            password,
            name,
            image: photo,
        });

        if (data) {
            toast.success(`Sign Up Successfully! -> ${data?.user?.name} Please Login...`);
            router.push('/');
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
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="max-w-7xl mx-auto py-10"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="border max-w-md mx-auto p-6 rounded-2xl bg-white dark:bg-neutral-950 dark:border-neutral-800">

                    <h1 className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-white">
                        Create Account
                    </h1>

                    {error && (
                        <p className="text-red-500 text-sm mb-4 text-center">
                            {error}
                        </p>
                    )}

                    <form className="space-y-5" onSubmit={onSubmit}>

                        <TextField name="name" type="text" isRequired>
                            <Label className="dark:text-white">Name</Label>
                            <Input placeholder="Enter your name" />
                            <FieldError />
                        </TextField>

                        <TextField name="email" type="email" isRequired>
                            <Label className="dark:text-white">Email</Label>
                            <Input placeholder="Enter email" />
                            <FieldError />
                        </TextField>

                        <TextField name="photo" type="url">
                            <Label className="dark:text-white">Photo URL</Label>
                            <Input placeholder="https://example.com/photo.jpg" />
                            <FieldError />
                        </TextField>

                        <TextField name="password" isRequired>
                            <Label className="dark:text-white">Password</Label>

                            <div className="relative">
                                <Input
                                    type={showPass ? "text" : "password"}
                                    placeholder="Create password"
                                    className="w-full"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPass(!showPass)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-gray-500 dark:text-gray-400"
                                >
                                    {showPass ? <EyeSlash size={18} /> : <Eye size={18} />}
                                </button>
                            </div>

                            <FieldError />
                        </TextField>

                        <TextField name="confirmPassword" isRequired>
                            <Label className="dark:text-white">Confirm Password</Label>

                            <div className="relative">
                                <Input
                                    type={showConfirmPass ? "text" : "password"}
                                    placeholder="Re-enter password"
                                    className="w-full"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-gray-500 dark:text-gray-400"
                                >
                                    {showConfirmPass ? <EyeSlash size={18} /> : <Eye size={18} />}
                                </button>
                            </div>

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

                    <p className="text-center text-sm my-4 text-gray-600 dark:text-gray-400">
                        Already have an account?{" "}
                        <Link href={'/signin'}>
                            <span className="text-green-700 font-medium cursor-pointer">
                                Login Now!
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
            </motion.div>
        </motion.div>
    );
};

export default SignUpPage;