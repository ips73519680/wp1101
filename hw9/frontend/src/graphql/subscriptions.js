import { gql } from '@apollo/client'

export const MESSAGES_SUBSCRIPTION = gql`
    subscription message($chatBoxName: String!) {
        message(chatBoxName: $chatBoxName){
            mutation
            data{
                sender{
                    name
                }
                body
            }
        }
    }
`