# USB デバイスを接続する

USB/IP の OSS，[usbipd-win](https://github.com/dorssel/usbipd-win)を使用して，Windows マシンに接続された USB デバイスを WSL2 に共有する。

## 前提条件

- Windows 11 (ビルド 22000 以降）が実行されていること
- x64/x86 プロセッサを搭載したマシンであること
- Linux ディストリビューションがインストールされており，かつ WSL2 に設定されていること
- Linux カーネル 5.10.60.1 以上が実行されていること

## USBIPD-WIN のインストール

USB デバイスの接続のサポートは WSL ではネイティブに使用できないので，オープンソースの usbipd-win プロジェクトをインストールする必要がある。

Windows パッケージ マネージャー (winget) を使用してインストールする。

`PowerShell`

```powershell
winget install --interactive --exact dorssel.usbipd-win
```

## Linux に USBIP ツールとハードウェア データベースをインストールする

USB/IP プロジェクトのインストールが完了したら，ユーザー空間ツールと USB ハードウェア識別子のデータベースをインストールする。

Ubuntu で，次のコマンドを実行する。

`Bash`

```shell
sudo apt install linux-tools-5.15.0-25-generic hwdata
sudo update-alternatives --install /usr/local/bin/usbip usbip /usr/lib/linux-tools/5.15.0-25-generic/usbip 20

# インストールできなかったら
sudo apt install linux-tools-<tab補完で一番新しいバージョン>-generic hwdata
sudo update-alternatives --install /usr/local/bin/usbip usbip /usr/lib/linux-tools/<tab補完で一番新しいバージョン>-generic/usbip 20
```

## USB デバイスを接続する

ターミナルで WSL を立ち上げ，アクティブに保つ。

PowerShell を **管理者 モード**で開き，次のコマンドを入力することで，Windows に接続されたすべての USB デバイスの一覧を表示する。

`PowerShell`

```powershell
usbipd wsl list
```

WSL に接続するデバイスのバス ID を確認し，以下のコマンドで，デバイスを接続する。

`PowerShell`

```powershell
usbipd wsl attach -b <busid>
```

Ubuntu を開き，次のコマンドを使用して接続された USB デバイスの一覧を表示する。

`Bash`

```shell
lsusb
```

先ほど接続したデバイスが表示され，Linux の通常のツールを使用して操作できるようになる。 アプリケーションによっては，ルート以外のユーザーがデバイスにアクセスするのを許可するために，udev の設定を構成する必要がある。

WSL でデバイスの使用が完了した後は，USB デバイスの接続を物理的に解除するか，PowerShell から **管理者モード** で以下のコマンドを実行する。

`PowerShell`

```powershell
usbipd wsl detach --busid <busid>
```
