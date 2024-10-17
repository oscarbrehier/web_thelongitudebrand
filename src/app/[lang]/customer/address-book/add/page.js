'use client';
import { PageContainer } from "@/components/container/page";
import { useState } from "react";
import InputWithLabel from "@/components/ui/InputWithLabel";
import Button from "@/components/ui/Button";
import { IoChevronDownOutline } from "react-icons/io5";
import Select from "@/components/ui/Select";
import PhoneSelect from "@/components/ui/PhoneSelect";

const countries = [
    "afghanistan", "albania", "algeria", "andorra", "angola", "antigua and barbuda", "argentina", "armenia", "australia", "austria", "azerbaijan",
    "bahamas", "bahrain", "bangladesh", "barbados", "belarus", "belgium", "belize", "benin", "bhutan", "bolivia", "bosnia and herzegovina", "botswana", "brazil", "brunei", "bulgaria", "burkina faso", "burundi",
    "cabo verde", "cambodia", "cameroon", "canada", "central african republic", "chad", "chile", "china", "colombia", "comoros", "congo, democratic republic of the", "congo, republic of the", "costa rica", "côte d’ivoire", "croatia", "cuba", "cyprus", "czech republic",
    "denmark", "djibouti", "dominica", "dominican republic",
    "east timor (timor-leste)", "ecuador", "egypt", "el salvador", "equatorial guinea", "eritrea", "estonia", "eswatini", "ethiopia",
    "fiji", "finland", "france",
    "gabon", "gambia", "georgia", "germany", "ghana", "greece", "grenada", "guatemala", "guinea", "guinea-bissau", "guyana",
    "haiti", "honduras", "hungary",
    "iceland", "india", "indonesia", "iran", "iraq", "ireland", "israel", "italy",
    "jamaica", "japan", "jordan",
    "kazakhstan", "kenya", "kiribati", "korea, north", "korea, south", "kosovo", "kuwait", "kyrgyzstan",
    "laos", "latvia", "lebanon", "lesotho", "liberia", "libya", "liechtenstein", "lithuania", "luxembourg",
    "madagascar", "malawi", "malaysia", "maldives", "mali", "malta", "marshall islands", "mauritania", "mauritius", "mexico", "micronesia, federated states of", "moldova", "monaco", "mongolia", "montenegro", "morocco", "mozambique", "myanmar (burma)",
    "namibia", "nauru", "nepal", "netherlands", "new zealand", "nicaragua", "niger", "nigeria", "north macedonia", "norway",
    "oman",
    "pakistan", "palau", "panama", "papua new guinea", "paraguay", "peru", "philippines", "poland", "portugal",
    "qatar",
    "romania", "russia", "rwanda",
    "saint kitts and nevis", "saint lucia", "saint vincent and the grenadines", "samoa", "san marino", "sao tome and principe", "saudi arabia", "senegal", "serbia", "seychelles", "sierra leone", "singapore", "slovakia", "slovenia", "solomon islands", "somalia", "south africa", "south sudan", "spain", "sri lanka", "sudan", "suriname", "sweden", "switzerland", "syria",
    "taiwan", "tajikistan", "tanzania", "thailand", "togo", "tonga", "trinidad and tobago", "tunisia", "turkey", "turkmenistan", "tuvalu",
    "uganda", "ukraine", "united arab emirates", "united kingdom", "united states", "uruguay", "uzbekistan",
    "vanuatu", "vatican city", "venezuela", "vietnam",
    "yemen",
    "zambia", "zimbabwe"
];

const countryCodes = [
    { code: '+216', name: 'TN', fullName: 'Tunisia' },
    { code: '+676', name: 'TO', fullName: 'Tonga' },
    { code: '+90', name: 'TR', fullName: 'Turkey' },
    { code: '+1-868', name: 'TT', fullName: 'Trinidad and Tobago' },
    { code: '+688', name: 'TV', fullName: 'Tuvalu' },
    { code: '+886', name: 'TW', fullName: 'Taiwan' },
    { code: '+255', name: 'TZ', fullName: 'Tanzania' },
    { code: '+380', name: 'UA', fullName: 'Ukraine' },
    { code: '+256', name: 'UG', fullName: 'Uganda' },
    { code: '+1', name: 'US', fullName: 'United States' },
    { code: '+1', name: 'UM', fullName: 'United States Minor Outlying Islands' },
    { code: '+33', name: 'FR', fullName: 'France' },
    { code: '+30', name: 'GR', fullName: 'Greece' },
];

export default function Page() {


    return (
        <div className="w-full mt-16 2md:grid grid-cols-4 gap-2">

            <div className="col-start-2 col-span-2 h-auto">

                <p className="capitalize mx-2 my-1">your address book</p>

                <div>

                    <div className="space-y-2">

                        <InputWithLabel
                            title='first name'
                            type='text'
                        />

                        <InputWithLabel
                            title='last name'
                            type='text'
                        />

                        <div className="w-full h-14 bg-cream-300 flex items-center px-4">

                            <Select
                                title='country'
                                options={countries}
                                defaultValue='france'
                            />

                        </div>

                        <InputWithLabel
                            title='street address 1'
                            type='text'
                        />

                        <InputWithLabel
                            title='street address 2'
                            type='text'
                        />

                        <InputWithLabel
                            title='city'
                            type='text'
                        />

                        <InputWithLabel
                            title='ZIP'
                            type='text'
                        />

                        <div className="flex space-x-2">

                            <div className="h-14 w-32 bg-cream-300 px-2">
                                <PhoneSelect
                                    title='prefix'
                                    options={countryCodes}
                                    defaultValue='france'
                                />
                            </div>

                            <InputWithLabel
                                title='phone'
                                type='tel'
                            />

                        </div>

                    </div>

                    <Button
                        title='save'
                        size='w-full h-14 mt-4'
                    />

                </div>

            </div>
        </div>
    );
};
