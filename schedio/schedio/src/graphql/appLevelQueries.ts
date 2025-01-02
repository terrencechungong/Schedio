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
}
`;