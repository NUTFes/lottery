package docs

import "github.com/swaggo/swag"

const docTemplate = `{
    "schemes": {{ marshal .Schemes }},
    "swagger": "2.0",
    "info": {
        "description": "{{escape .Description}}",
        "title": "{{.Title}}",
        "contact": {},
        "version": "{{.Version}}"
    },
    "host": "{{.Host}}",
    "basePath": "{{.BasePath}}",
    "paths": {
        "/admins":{
            "get":{
                tags: ["admin"],
                "description":"全アドミンユーザの取得",
                "responses":{
                    "200":{
                        "description":"OK",
                        "schema":{
                            "type":"array",
                        }
                    }
                }
            },
            "post":{
                tags: ["admin"],
                "description":"アドミンユーザーの作成",
                "parameters": [
                    {
                        "name": "name",
                        "type": "string",
                        "in": "query",
                        "description": "アドミンユーザー名",
                    },
                    {
                        "name": "email",
                        "type": "string",
                        "in": "query",
                        "description": "アドミンユーザーのメールアドレス",
                    },
                    {
                        "name": "password",
                        "type": "string",
                        "in": "query",
                        "description": "アドミンユーザーのパスワード",
                    }
                ],
                "responses":{
                    "200":{
                        "description":"Created Admin",
                    },
                }
            }
        },
        "/admins/{id}":{
            "get":{
                tags: ["admin"],
                "description":"IDを指定してアドミンユーザーの取得",
                "parameters": [
                    {
                        "name": "id",
                        "type": "integer",
                        "in": "path",
                        "description": "アドミンユーザーID",
                        "required": true
                    }
                ],
                "responses":{
                    "200":{
                        "description":"OK",
                        "schema":{
                            "type":"object",
                        }
                    }
                }
            },
            "put":{
                tags: ["admin"],
                "description":"IDを指定してアドミンユーザーの更新",
                "parameters": [
                    {
                        "name": "id",
                        "type": "integer",
                        "in": "path",
                        "description": "アドミンユーザーID",
                        "required": true
                    },
                    {
                        "name": "name",
                        "type": "string",
                        "in": "query",
                        "description": "アドミンユーザー名",
                    },
                    {
                        "name": "email",
                        "type": "string",
                        "in": "query",
                        "description": "アドミンユーザーのメールアドレス",
                    },
                    {
                        "name": "password",
                        "type": "string",
                        "in": "query",
                        "description": "アドミンユーザーのパスワード",
                    }
                ],
                "responses":{
                    "200":{
                        "description":"OK",
                        "schema":{
                            "type":"object",
                        }
                    }
                }
            },
            "delete":{
                tags: ["admin"],
                "description":"IDを指定してアドミンユーザーの削除",
                "parameters": [
                    {
                        "name": "id",
                        "type": "integer",
                        "in": "path",
                        "description": "アドミンユーザーID",
                        "required": true
                    }
                ],
                "responses":{
                    "200":{
                        "description":"OK",
                    }
                }
            },
        },
        "/events":{
            "get":{
                tags: ["event"],
                "description":"全イベントの取得",
                "responses":{
                    "200":{
                        "description":"OK",
                        "schema":{
                            "type":"array",
                        }
                    }
                }
            },
            "post":{
                tags: ["event"],
                "description":"イベントの作成",
                "parameters": [
                    {
                        "name": "name",
                        "type": "string",
                        "in": "query",
                        "description": "イベント名",
                    },
                    {
                        "name": "description",
                        "type": "string",
                        "in": "query",
                        "description": "イベントの説明",
                    }
                ],
                "responses":{
                    "200":{
                        "description":"Created Event",
                    },
                }
            }
        },
        "/events/{id}":{
            "get":{
                tags: ["event"],
                "description":"IDを指定してイベントの取得",
                "parameters": [
                    {
                        "name": "id",
                        "type": "integer",
                        "in": "path",
                        "description": "イベントID",
                        "required": true
                    }
                ],
                "responses":{
                    "200":{
                        "description":"OK",
                        "schema":{
                            "type":"object",
                        }
                    }
                }
            },
            "put":{
                tags: ["event"],
                "description":"IDを指定してイベントの更新",
                "parameters": [
                    {
                        "name": "id",
                        "type": "integer",
                        "in": "path",
                        "description": "イベントID",
                        "required": true
                    },
                    {
                        "name": "name",
                        "type": "string",
                        "in": "query",
                        "description": "イベント名",
                    },
                    {
                        "name": "description",
                        "type": "string",
                        "in": "query",
                        "description": "イベントの説明",
                    }
                ],
                "responses":{
                    "200":{
                        "description":"OK",
                        "schema":{
                            "type":"object",
                        }
                    }
                }
            },
            "delete":{
                tags: ["event"],
                "description":"IDを指定してイベントの削除",
                "parameters": [
                    {
                        "name": "id",
                        "type": "integer",
                        "in": "path",
                        "description": "イベントID",
                        "required": true
                    }
                ],
                "responses":{
                    "200":{
                        "description":"OK",
                    }
                }
            }
        },
        "/users":{
            "get":{
                tags: ["user"],
                "description":"全ユーザーの取得",
                "responses":{
                    "200":{
                        "description":"OK",
                        "schema":{
                            "type":"array",
                        }
                    }
                }
            },
            "post":{
                tags: ["user"],
                "description":"ユーザーの作成",
                "parameters": [
                    {
                        "name": "name",
                        "type": "string",
                        "in": "query",
                        "description": "ユーザー名",
                    },
                    {
                        "name": "number",
                        "type": "integer",
                        "in": "query",
                        "description": "ユーザーの学籍番号",
                    }
                ],
                "responses":{
                    "200":{
                        "description":"Created User",
                    },
                }
            }
        },
        "/users/{id}":{
            "get":{
                tags: ["user"],
                "description":"IDを指定してユーザーの取得",
                "parameters": [
                    {
                        "name": "id",
                        "type": "integer",
                        "in": "path",
                        "description": "ユーザーID",
                        "required": true
                    }
                ],
                "responses":{
                    "200":{
                        "description":"OK",
                        "schema":{
                            "type":"object",
                        }
                    }
                }
            },
            "put":{
                tags: ["user"],
                "description":"IDを指定してユーザーの更新",
                "parameters": [
                    {
                        "name": "id",
                        "type": "integer",
                        "in": "path",
                        "description": "ユーザーID",
                        "required": true
                    },
                    {
                        "name": "name",
                        "type": "string",
                        "in": "query",
                        "description": "ユーザー名",
                    },
                    {
                        "name": "number",
                        "type": "integer",
                        "in": "query",
                        "description": "ユーザーの学籍番号",
                    }
                ],
                "responses":{
                    "200":{
                        "description":"OK",
                        "schema":{
                            "type":"object",
                        }
                    }
                }
            },
            "delete":{
                tags: ["user"],
                "description":"IDを指定してユーザーの削除",
                "parameters": [
                    {
                        "name": "id",
                        "type": "integer",
                        "in": "path",
                        "description": "ユーザーID",
                        "required": true
                    }
                ],
                "responses":{
                    "200":{
                        "description":"OK",
                    }
                }
            }
        },
        "/winners":{
            "get":{
                tags: ["winner"],
                "description":"全ウィナーの取得",
                "responses":{
                    "200":{
                        "description":"OK",
                        "schema":{
                            "type":"array",
                        }
                    }
                }
            },
            "post":{
                tags: ["winner"],
                "description":"ウィナーの作成",
                "parameters": [
                    {
                        "name": "user_id",
                        "type": "integer",
                        "in": "query",
                        "description": "ユーザーID",
                    },
                ],
                "responses":{
                    "200":{
                        "description":"Created Winner",
                    },
                }
            }
        },
        "/winners/{id}":{
            "get":{
                tags: ["winner"],
                "description":"IDを指定してウィナーの取得",
                "parameters": [
                    {
                        "name": "id",
                        "type": "integer",
                        "in": "path",
                        "description": "ウィナーID",
                        "required": true
                    }
                ],
                "responses":{
                    "200":{
                        "description":"OK",
                        "schema":{
                            "type":"object",
                        }
                    }
                }
            },
            "put":{
                tags: ["winner"],
                "description":"IDを指定してウィナーの更新",
                "parameters": [
                    {
                        "name": "id",
                        "type": "integer",
                        "in": "path",
                        "description": "ウィナーID",
                        "required": true
                    },
                    {
                        "name": "user_id",
                        "type": "integer",
                        "in": "query",
                        "description": "ユーザーID",
                    },
                ],
                "responses":{
                    "200":{
                        "description":"OK",
                        "schema":{
                            "type":"object",
                        }
                    }
                }
            },
            "delete":{
                tags: ["winner"],
                "description":"IDを指定してウィナーの削除",
                "parameters": [
                    {
                        "name": "id",
                        "type": "integer",
                        "in": "path",
                        "description": "ウィナーID",
                        "required": true
                    }
                ],
                "responses":{
                    "200":{
                        "description":"OK",
                    }
                }
            }
        }
    }
}`

// SwaggerInfo holds exported Swagger Info so clients can modify it
var SwaggerInfo = &swag.Spec{
	Version:          "1.0",
	Host:             "localhost:1323",
	BasePath:         "/",
	Schemes:          []string{"http"},
	Title:            "NUTFes Lottery API",
	Description:      "NUTFes Lottery API",
	InfoInstanceName: "swagger",
	SwaggerTemplate:  docTemplate,
}

func init() {
	swag.Register(SwaggerInfo.InstanceName(), SwaggerInfo)
}
