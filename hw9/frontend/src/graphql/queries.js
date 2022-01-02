import { gql } from '@apollo/client'

export const MESSAGES_QUERY = gql`
    query chatbox($name:String!, $to: String!){
        chatbox(name: $name, to: $to){
            name
            messages{
                sender{
                    name
                }
                body
            }
        }
    }
`