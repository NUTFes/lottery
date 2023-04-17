<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=false displayMessage=false; section>
    <#if section = "title">
        ${msg("loginTitle",(realm.displayName!''))}
    <#elseif section = "form">
        <#if realm.password>
            <div class="container">
                <form class="body" onsubmit="login.disabled = true; return true;" action="${url.loginAction?keep_after('^[^#]*?://.*?[^/]*', 'r')}" method="post">
                    <img src="${url.resourcesPath}/img/nutfes_logo.png" class="logo">
                    <div class="title item">
                        <p class="item-text">ログイン</p>
                    </div>
                    <div class="item">
                        <p class="item-text">メールアドレス</p>
                        <input id="username" name="username" value="${(login.username!'')}" type="text" autofocus autocomplete="off" placeholder="email" />
                    </div>
                    <div class="item">
                        <p class="item-text">パスワード</p>
                        <input  id="password" name="password" type="password" autocomplete="off" placeholder="password"/>
                    </div>
                    <div>
                        <button class="login" type="submit">ログイン </button>
                    </div>
                    <#if message?has_content>
                        <div class="alert">
                            <p class="alert-text">${kcSanitize(message.summary)?no_esc}</p>
                        </div>
                    </#if>
                </form>
            </div>
        </#if>
    </#if>
</@layout.registrationLayout>
