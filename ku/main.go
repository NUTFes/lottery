package main

import (
	"context"
	"os"
	// "fmt"
	"strconv"

	"github.com/Nerzal/gocloak/v13"
)

func CreateKeycloakUser() {
	// トークン生成のための定義
	client := gocloak.NewClient("http://localhost:8080")
	ctx := context.Background()
	client_id := "admin-cli"
	client_secret := os.Getenv("KEYCLOAK_SECRET")
	grant_type := "password"
	user_name := "admin"
	password := "admin"

	options := &gocloak.TokenOptions{
	ClientID: &client_id,
	ClientSecret: &client_secret,
	GrantType: &grant_type,
	Username: &user_name,
	Password: &password}

	// keycloakユーザ情報
	user := gocloak.User{
	// FirstName: gocloak.StringP("Bob"),
	// LastName:  gocloak.StringP("Uncle"),
	Email:     gocloak.StringP("something@hoge"),
	Enabled:   gocloak.BoolP(true),
	Username:  gocloak.StringP("hoge"),
	}

	// ユーザの作成
	for i := 1; i <= 5; i++ {
		token, err := client.GetToken(ctx , "master" , *options )
		// fmt.Println(token.AccessToken)
		if err != nil {
			panic("NO! failed to get token :")
		}
		print(token.AccessToken)

		*user.Username = "hoge"
		*user.Email = "something@hoge"

		*user.Username += strconv.Itoa(i)
		*user.Email += strconv.Itoa(i)

		_, err = client.CreateUser(ctx, token.AccessToken, "master", user)
		if err != nil {
		panic("Oh no!, failed to create user :(")
		}
	}




}

func main () {
	CreateKeycloakUser()
}
