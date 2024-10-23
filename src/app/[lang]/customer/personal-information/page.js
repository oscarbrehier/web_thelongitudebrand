'use client';
import { useState, useEffect } from "react";
import InputWithLabel from "@/app/components/ui/InputWithLabel";
import Button from "@/app/components/ui/Button";
import { IoCheckmark } from "react-icons/io5";
import { useAuthContext } from "@/lib/context/AuthContext";
import getUserFromUid from "@/lib/authentication/getUserFromUid";
import updateUserProfile from "@/lib/authentication/updateUserProfile";
import Hyperlink from '@/app/components/ui/Hyperlink';

export default function Page() {

    const [formValues, setFormValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        dateOfBirth: "",
        newsletterSubscriber: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { user } = useAuthContext();

    const handleInputChange = (e) => {

        const { name, value, type, checked } = e.target;

        setFormValues(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));

    };

    const handleSubmitForm = async () => {

        try {

            setLoading(true);
            await updateUserProfile(user.uid, formValues);

        } catch (error) {

            setError("An error occured. Please try again or come back later");

        } finally {

            setLoading(false);

        };

    };

    useEffect(() => {

        const getData = async () => {

            const { firstName, lastName, dateOfBirth, newsletterSubscriber } = await getUserFromUid(user.uid);

            setFormValues(prev => ({
                ...prev,
                firstName,
                lastName,
                dateOfBirth,
                newsletterSubscriber,
                email: user.email,
            }));

        };

        if (user) {

            getData();

        };

    }, [user]);

    const handleSubscribeCheckbox = async (event) => {

        const { checked } = event.target;

        try {

            setFormValues(prev => ({
                ...prev,
                newsletterSubscriber: checked
            }));
    
            await updateUserProfile(user.uid, {
                newsletterSubscriber: checked
            });

        } catch (error) {

            console.error(error);

        };

    };

    return user ? (

        <div className="w-full mt-16 2md:grid grid-cols-4 gap-2">

            <div className="col-start-2 col-span-2 h-auto">

                <div>

                    <p className="capitalize mx-2 my-1">personal information</p>

                    <div className="space-y-2">

                        <InputWithLabel
                            title='first name'
                            value={formValues.firstName}
                            type='text'
                            onChange={(e) => handleInputChange(e)}
                        />

                        <InputWithLabel
                            title='last name'
                            value={formValues.lastName}
                            type='text'
                            onChange={(e) => handleInputChange(e)}
                        />

                        <InputWithLabel
                            title='email'
                            value={formValues.email}
                            type='email'
                            disabled
                        />

                        <InputWithLabel
                            title='date of birth'
                            type='date'
                            optional={true}
                            value={formValues.dateOfBirth}
                            onChange={(e) => handleInputChange(e)}
                        />

                        {error !== "" && (
                            <p className="text-sm text-error-red">{error}</p>
                        )}

                    </div>

                    <div className="mt-4 space-y-2">

                        <Button 
                            title='save'
                            size='w-full h-14'
                            onClick={handleSubmitForm}
                            loading={loading}
                        />

                        <Hyperlink
                            to="/customer/personal-information/change-password"
                            title='change password'
                            size='w-full h-14'
                            onClick={handleSubmitForm}
                            border={true}
                        />

                    </div>

                </div>

                <div className="space-y-4 mt-20">

                    <p className="capitalize mx-2 my-1">Your preferences</p>

                    <div className="space-y-4">

                        <div className="flex space-x-4">

                            <div className="relative flex items-center justify-center">

                                <input
                                    className="appearance-none size-6 border-[1px] border-black bg-cream-50 peer"
                                    type="checkbox"
                                    onChange={(e) => handleSubscribeCheckbox(e)}
                                    name="newsletterSubscriber"
                                    checked={formValues.newsletterSubscriber}
                                />

                                <div className="absolute hidden peer-checked:block pointer-events-none text-xl">
                                    <IoCheckmark />
                                </div>

                            </div>

                            <div className="text-xs">

                                <p>Subscriber</p>
                                <p className="text-neutral-600">
                                    Be the first to receive Longitude news, including new collections, launches and sales. Sent twice a week.
                                </p>

                            </div>

                        </div>

                    </div>
                </div>

            </div>

        </div>

    ) : (

        <div></div>

    );

};
