import { gql } from '@apollo/client';

export const GET_WORKSPACE_BY_ID = gql`
  query GetWorkspaceById($id: ID!) {
    workspace(id: $id) {
      linkedAccounts {
        _id
        username
        platform
      }
    }
  }
`;

export const CREATE_NEW_POST_DURING_COMPOSE_EDIT = gql`
  mutation CreateNewPostCuringComposeEdit($post: CreatePostInput!) {
    createPost(post: $post) {
      _id
    }
}`;

export const UPDATE_POST_MEDIA = gql`
  mutation UpdatePostMedia($updatePostMediaId: ID!, $postVariationKey: String!, $media: [CreatePostMediaInput]!) {
    updatePostMedia(id: $updatePostMediaId, postVariationKey: $postVariationKey, media: $media) {
      _id
    }
}`;

export const UPDATE_POST_CAPTION = gql`
  mutation UpdatePostCaption($updatePostCaptionId: ID!, $postVariationKey: String!, $caption: String!) {
    updatePostCaption(id: $updatePostCaptionId, postVariationKey: $postVariationKey, caption: $caption) {
      _id
    }
  }`;