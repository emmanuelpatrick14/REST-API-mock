// using the insralled confgi modell ...google config npm docs


export default{
    port: 1337,
   
    dbUri:
    "mongodb+srv://emmanueljoeemie:HweJht9Zrkic8SXe@emmanueljoeemie.ogqhhdc.mongodb.net/?retryWrites=true&w=majority&appName=emmanueljoeemie",
    saltWorkFactor:10,
    accessTokenTtl:'15m',
    refreshTokenTtl:'1y'
    ,
    privateKey: "-----BEGIN RSA PRIVATE KEY-----\nMIIEpQIBAAKCAQEAfG3rK8cB1tQ6vW9yX2nZ7oU4mL0aJ5dR...\n-----END RSA PRIVATE KEY-----",
    // to validate signed jwt signes by he prvate key
   publicKey: "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9jD7kL2nT5bV8wY3pQ1sU4rX9mN0aZ6eF...\n-----END PUBLIC KEY-----"
    //to genrate jwt
}   