# USB デバイスを接続する

USB/IP の OSS，[usbipd-win](https://github.com/dorssel/usbipd-win)を使用して，Windows マシンに接続された USB デバイスを WSL2 に共有する。

## 前提条件

- Windows 11 (ビルド 22000 以降）が実行されていること
- x64/x86 プロセッサを搭載したマシンであること
- Linux ディストリビューションがインストールされており、かつ WSL2 に設定されていること
- Linux カーネル 5.10.60.1 以上が実行されていること

## USBIPD-WIN のインストール

USB デバイスの接続のサポートは WSL ではネイティブに使用できないので、オープンソースの usbipd-win プロジェクトをインストールする必要がある。

Windows パッケージ マネージャー (winget) を使用してインストールする。

`PowerShell`

```powershell
winget install --interactive --exact dorssel.usbipd-win
```

これにより、次のものがインストールされます。

## Linux に USBIP ツールとハードウェア データベースをインストールする

USB/IP プロジェクトのインストールが完了したら、ユーザー空間ツールと USB ハードウェア識別子のデータベースをインストールする。

Ubuntu で、次のコマンドを実行する。

`Bash`

```shell
sudo apt install linux-tools-generic hwdata
sudo update-alternatives --install /usr/local/bin/usbip usbip /usr/lib/linux-tools/generic/usbip 20
```

## USB デバイスを接続する

USB デバイスを接続する前に、WSL コマンド ラインが開いていることを確認します。 これにより、WSL 2 ライトウェイト VM がアクティブに保たれます。

PowerShell を "管理者" モードで開き、次のコマンドを入力することで、Windows に接続されたすべての USB デバイスの一覧を表示します。

PowerShell

コピー
usbipd wsl list
WSL に接続するデバイスのバス ID を選択し、こちらのコマンドを実行します。 WSL によって sudo コマンドを実行するためのパスワードが求められます。 アタッチする Linux ディストリビューションは、既定のディストリビューションである必要があります。 (既定のディストリビューションを変更するには 、WSL ドキュメントの基本コマンド を参照してください)。

PowerShell

コピー
usbipd wsl attach --busid <busid>
Ubuntu (または任意の WSL コマンド ライン) を開き、次のコマンドを使用して接続された USB デバイスの一覧を表示します。

Bash

コピー
lsusb
先ほど接続したデバイスが表示され、Linux の通常のツールを使用して操作できるようになります。 お使いのアプリケーションによっては、ルート以外のユーザーがデバイスにアクセスするのを許可するために、udev の規則を構成する必要がある場合があります。

WSL でデバイスの使用が完了した後は、USB デバイスの接続を物理的に解除するか、PowerShell から "管理者モード" でこちらのコマンドを実行します。

PowerShell

コピー
usbipd wsl detach --busid <busid>
この仕組みの詳細については、Windows コマンド ラインのブログと GitHub の usbipd-win リポジトリを参照してください。

ビデオ デモについては、「WSL 2: USB デバイスの接続 (Tabs vs Spaces ショー)」を参照してください。
