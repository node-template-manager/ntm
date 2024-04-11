<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.imgur.com/SBRbHj7.jpeg" alt="Project logo"></a>
</p>

<h3 align="center">ntm | node-template-manager</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> 
Streamline the initiation of Node.js projects for users with pre-defined templates. You can use your favorite terminal to initialize your new project. Also define custom templates and share with community!
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Authors](#authors)

## 🧐 About <a name = "about"></a>
> NTM - Node Template Manager
<ul>
<li>🚀 Initialize your new projects faster</li>
<li>✏️ Create custom templates</li>
<li>💓 Share with community</li>
<li>🖥 Be part of this project</li>
</ul>

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

You just need to have installed node.js. If you haven't it yet, I recommend you to use Node Version Manager (NVM); for installing it, check the link bellow: 

[NVM for Linux & Mac](https://github.com/nvm-sh/nvm)
[NVM for Windows](https://github.com/coreybutler/nvm-windows)

### Installing

Just install the NPM package globally


```
npm install -g node-template-manager
```

Check if was installed successfully

```
ntm --version
```

## 🎈 Usage <a name="usage"></a>

There're few things you can do with Node Template Manager. Take a look!

<h4>Show all available templates</h4>

```
ntm init [template] [projectPath]
```
Get all available templates. Simple!

<h4>Init project with template</h4>

```
ntm init [template] [projectPath]
```
Introduce the template's name and where to create the project. If you don't indicate the project's path, it'll take where you invoke the command.
There's also a default template for you!


<h4>Create a new custom template</h4>

```
ntm create <create>
```
Init a blank template for you. You only have to configure it. For that, look for it in docs' section, where you can find an easy guide to custom your new template and share it with others. [-> To docs](#docs) 


## 📖 Docs <a name="docs"></a>

### How to define a custom template

Well, you've just create a new template with the create command. What to do next?

1. Find the package folder
It should be in many places depending your OS. 
- At Windows, you can try in 'C:\Users\{YourUser}\AppData\Roaming\npm\node_modules\node-template-manager' or in 'C:\Users\{YourUser}\AppData\Roaming\npm-cache'.
- At Linux, you can try in '/usr/local/lib/node_modules' or '~/.npm-global'.

2. After that, be sure you can edit this folder & find the templates' folder, where all available templates are saved. There must be your custom template

3. If you have already created files, copy them into files folder

4. At last, write the main .json following the instructions inside it. This one should have been called as your template's name.

> In future, it's raised adding a new tool to custom the template easily.

### How to share a custom template


> Working in...

## ✍️ Authors <a name = "authors"></a>

- [@csanbardev](https://github.com/csanbardev) - Idea & Initial work


