import { PostStatus } from "@/constants";

export const createPostExec = async (globalProfilesArray, postVariations, postTypeData,
    createPost, postBeingEditedId
) => {
    const includedAccounts = globalProfilesArray.filter(p => p.active).map(p => p._id);
    let pv = Object.entries(postVariations).map(([key, value]) => ({ key, value }))
    const newPost = {
        includedAccounts,
        postType: postTypeData.type,
        status: PostStatus.Draft,
        createdBy: "676c82ac58989ac8765ef21b",
        lastUpdatedBy: "676c82ac58989ac8765ef21b",
        postVariations: pv,
        hasBeenPostedAtLeastOnce: false,
        workspace: "676c918ba493330cedba04e4",
        notes: "",
    }
    try {
        const { data } = await createPost({
            variables: { post: newPost },
        });
        const newURL = `${window.location.pathname}/${data.createPost._id}`; // Append to the current path
        window.history.replaceState(null, '', newURL);
        return {postCreated: true, id: data.createPost._id};
    } catch (err) {
        console.error('Error executing mutation:', err);
        return {postCreated: false, id: ""};
    }
}

export const updatePostCaptionExec = async (updatePostCaptionId: string, postVariationKey: string, 
    caption: string, updatePostCaption
) => {

    try {
        const { data } = await updatePostCaption({
            variables: {
                updatePostCaptionId,
                postVariationKey, caption
             },
        });
        // handle errors
        if (data.updatePostCaption._id) return true;
    } catch (err) {
        console.error('Error executing mutation:', err);
        return false;
    }
}