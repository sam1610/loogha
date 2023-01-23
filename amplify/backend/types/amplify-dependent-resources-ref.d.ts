export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "userPoolGroups": {
            "GpUSerPoolGroupRole": "string"
        },
        "looghaProject": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string"
        }
    },
    "api": {
        "loogha": {
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        }
    },
    "storage": {
        "looghaProject": {
            "BucketName": "string",
            "Region": "string"
        }
    },
    "predictions": {
        "speechGeneratora8cd7f53": {
            "region": "string",
            "language": "string",
            "voice": "string"
        }
    }
}