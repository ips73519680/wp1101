import { gql } from '@apollo/client';

export const CREATE_CHATBOX_MUTATION = gql`
  mutation createChatBox(
    $name: String!
    $to: String!
  ) {
    createChatBox(
      name: $name
      to: $to
    ) {
      name
      messages{
          sender{
              name
          }
          body
      }
    }
  }
`;

export const CREATE_MESSAGE_MUTATION = gql`
  mutation createMessage(
    $name: String!
    $to: String!
    $body: String!
  ) {
    createMessage(
      name: $name
      to: $to
      body: $body
    ) {
      sender{
          name
      }
      body
    }
  }
`;