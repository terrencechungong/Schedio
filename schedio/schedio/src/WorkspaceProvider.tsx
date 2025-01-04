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