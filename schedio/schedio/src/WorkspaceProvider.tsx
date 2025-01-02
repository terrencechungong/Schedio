import { useQuery } from "@apollo/client";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { GET_WORKSPACE_BY_ID } from "./graphql/appLevelQueries";
import { PlatformName, Profile } from "./layout";
import { Constants } from "./constants";

interface WorkspaceContextType {
    globalProfiles: { [key: number]: Profile };
    setGlobalProfiles: React.Dispatch<React.SetStateAction<{ [key: number]: Profile }>>;
    updateGlobalProfiles: (id: number, profile: Partial<Profile>) => void;
    globalProfilesArray: Profile[];
}
export const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export const WorkspaceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { data, loading, error } = useQuery(GET_WORKSPACE_BY_ID, {
        variables: { id: "676c918ba493330cedba04e4" },
    });

    const [globalProfiles, setGlobalProfiles] = useState<{ [key: number]: Profile }>(
        {
            0: { name: Constants.GLOBAL_PROFILES_STILL_LOADING, active: false, unique: false, id: 0, platform: 'Facebook', isShort: false, sharesName: false, _id:'' } as Profile,
        }
    );
    const [globalProfilesArray, setGlobalProfilesArray] = useState(Object.values(globalProfiles))

    //     {
    //         0: { name: 'Emily Johnson', active: false, unique: false, id: 0, platform: 'Facebook', isShort: false, sharesName: false } as Profile,
    //         1: { name: 'Michael Brown', active: false, unique: false, id: 1, platform: 'Instagram', isShort: false, sharesName: false } as Profile,
    //         2: { name: 'Sarah Lee', active: false, unique: false, id: 2, platform: 'Instagram', isShort: false, sharesName: false } as Profile,
    //         3: { name: 'David Davis', active: false, unique: false, id: 3, platform: 'Facebook', isShort: false, sharesName: false } as Profile,
    //         4: { name: 'Jessica Martin', active: false, unique: false, id: 4, platform: 'LinkedIn', isShort: false, sharesName: false } as Profile,
    //         5: { name: 'Kevin White', active: false, unique: false, id: 5, platform: 'LinkedIn', isShort: false, sharesName: false } as Profile,
    //         6: { name: 'Amanda Taylor', active: false, unique: false, id: 6, platform: 'Facebook', isShort: true, sharesName: true } as Profile,
    //         7: { name: 'Brian Hall', active: false, unique: false, id: 7, platform: 'Facebook', isShort: true, sharesName: false } as Profile,
    //         8: { name: 'Rachel Patel', active: false, unique: false, id: 8, platform: 'Youtube', isShort: true, sharesName: false } as Profile,
    //         9: { name: 'Christopher Brooks', active: false, unique: false, id: 9, platform: 'TikTok', isShort: true, sharesName: false } as Profile,
    //         10: { name: 'Laura Garcia', active: false, unique: false, id: 10, platform: 'TikTok', isShort: true, sharesName: false } as Profile,
    //         11: { name: 'Matthew Thompson', active: false, unique: false, id: 11, platform: 'Youtube', isShort: true, sharesName: false } as Profile
    //     }
    // );

    const accountIsOnlyShortForm = (platform: PlatformName) => {
        return [PlatformName.TikTok,
        PlatformName.Youtube].includes(platform);
    }

    const accountIsShortAndLongForm = (platform: PlatformName) => {
        return [PlatformName.Instagram,
        PlatformName.Facebook,
        ].includes(platform);
    }

    const accountIsOnlyLongForm = (platform: PlatformName) => {
        return [PlatformName.LinkedIn,
        PlatformName.Threads,
        PlatformName.Pinterest,
        ].includes(platform);
    }

    useEffect(() => {
        console.log(loading, error, data);
        // handle errors
        // just focus on using data from a backend and seeing crud
        // then make the real thing after set up is done
        if (!loading && data && data.workspace) {
            const accounts = data.workspace.linkedAccounts.reduce((acc: any[], account: any) => {
                console.log("THE IDE", account._id, typeof account._id)
                const profileBasics = {
                    _id: account._id,
                    name: account.username,
                    active: false,
                    unique: false, platform: account.platform as PlatformName, sharesName: false
                }
                if (accountIsOnlyLongForm(account.platform as PlatformName)) {
                    acc[0][acc[1]] = {
                        ...profileBasics,
                        id: acc[1],
                        isShort: false,
                    };
                    return [acc[0], acc[1] + 1];
                } else if (accountIsOnlyShortForm(account.platform as PlatformName)) {
                    acc[0][acc[1]] = {
                        ...profileBasics,
                        id: acc[1],
                        isShort: true,
                    };
                    return [acc[0], acc[1] + 1];
                } else if (accountIsShortAndLongForm(account.platform as PlatformName)) {
                    acc[0][acc[1]] = {
                        ...profileBasics,
                        id: acc[1],
                        isShort: false,
                    };
                    acc[0][acc[1] + 1] = {
                        ...profileBasics,
                        id: acc[1] + 1,
                        isShort: true,
                    };
                    return [acc[0], acc[1] + 2];
                }
            }, [{}, 0]); // object and index
            setGlobalProfiles(accounts[0]);
            console.log("GLOBAL PROFILES SET", accounts)
        } 
        if (error) {
            console.log("error", error)
            setGlobalProfiles({
                0: { name: Constants.ERROR_LOADING_PROFILES, active: false, unique: false, id: 0, platform: 'Facebook', isShort: false, sharesName: false } as Profile,
            })
        }

    }, [loading]);

    useEffect(() => {
        setGlobalProfilesArray(Object.values(globalProfiles));
    }, [globalProfiles]);

    const updateGlobalProfiles = (id: number, profile: Partial<Profile>) => {
        setGlobalProfiles((prev) => ({
            ...prev,
            [id]: { ...prev[id], ...profile }
        }))
    }

    return (
        <WorkspaceContext.Provider value={{
            updateGlobalProfiles,
            globalProfiles,
            setGlobalProfiles,
            globalProfilesArray,
        }}>
            {children}
        </WorkspaceContext.Provider>
    )
}

export const useWorkspaceContext = () => {
    const context = useContext(WorkspaceContext);
    if (!context) {
        throw new Error("useWorkspaceContext must be used within a WorkSpaceProvider");
    }
    return context;
};