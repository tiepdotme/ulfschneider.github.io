---
layout: post
title: Pocket Git Guide
subtitle: A brief entry-level approach to Git
date:   2016-03-13
permalink: 
author:
abstract: A brief entry-level approach to Git. 
---

- **Contents**
- [Reasons to use Git](#reasons-to-use-git)
- [Tell Git who you are](#tell-git-who-you-are)
- [Create a new local repository](#create-a-new-local-repository)
- [Status of your repository](#status-of-your-repository)
- [Stage to tell Git what to refer to](#stage-to-tell-git-what-to-refer-to)
- [Commit to make a snapshot of your work](#commit-to-make-a-snapshot-of-your-work)
- [The commit message](#the-commit-message)
- [Removing files](#removing-files)
- [Renaming files](#renaming-files)
- [Ignoring files](#ignoring-files)
- [Branch to isolate](#branch-to-isolate)
- [Merge to include](#merge-to-include)
- [Working with remotes to share with a team](#working-with-remotes-to-share-with-a-team)
- [Clone a remote repository to local](#clone-a-remote-repository-to-local)
- [Push data to remote](#push-data-to-remote)
- [Pull data from remote](#pull-data-from-remote)
- [The big picture](#the-big-picture)
- [Command reference](#command-reference)
- [References](#references)
{:.toc}

Reasons to use Git
---
Git will help you doing the following things with a computer:

<div class="grid"><div class="col-1-2 first">
<strong>Personal</strong>
<ul>
<li>Keep track of file revisions when working iteratively (this is often referred to as version control).</li>
<li>Safely experiment because you can always step back to the previous save version.</li>
<li>No need to give your files version indicating names, like essay_v1.txt, essay_v2.txt and so on.</li>
<li>It doesn´t play a role if you want to work on a single file or a multi-file project organized in many folders.</li>
<li>Convert any file or folder structure into a project that is under version control.</li>
<li>Have the advantage of powerful version control without the need to setup a server or creating an account somewhere.</li>
<li>Work consistently on multiple different operating systems, like MacOS, Linux and Windows.</li>
</ul>
</div>
<div class="col-1-2 last">
<strong>Team</strong>
<ul>
<li>Share your work with others and keep track of their changes by enforcing the same set of rules for managing versions. This will work even with thousands of persons on a big project, but also scales down nicely for a small team.</li>
<li>When sharing your work with others, you can work on your local computer without being always connected to a shared repository, only synchronizing eventually.</li>
<li>No centralized locking of files. All team members have their own working copy on their own computers which allows each of them to work independently.</li>
</ul>
</div>
</div>

Git is free. When you try to use Git for the first time on a Mac (my preferred environment), you will be asked to install the command line tools, which will subsequently bring Git on your Mac. For other platforms you may use [git-scm](https://git-scm.com/downloads) to download and install a suitable version of Git.

Tell Git who you are
---
```
git config [--global] user.name ["your name"]
git config [--global] user.email ["your email address"]
```

Use the `--global` option to tell Git that the given configuration will be the default for all of your projects on your computer. After these settings have been made, they will be added to your commits. When you then push commits to a shared server, your name and email address will also appear on that server. 

Detect your configuration settings with 

```
git config --list
```

Create new local repository
---
Move to the folder which should contain your project

```
cd /path/to/your/prj/
```

Then initialize the Git repository for the project with 

```
git init
```

Status of your repository
---
When inside of a local Git repository

```
git status
```

will tell you what branch you are currently working on and give you an overview about untracked changes and outstanding commits.

Stage to tell Git what to refer to
---
To prepare a snapshot of your current work, which will be stored in the Git repository, call

```
git add [<pathspec>]
```

`<pathspec>` specifies the files to be put into the staging area (the index). Wildcards are allowed. 

If a version of a file is not staged, Git doesn´t know how to refer to that version of the file and therefore you can´t commit it later on. Staged but uncommitted content remains only on your local computer and will not be send to a remote repository somewhere else. 

If you omit the `<pathspec>`, use

```
git add --all
```

which will ensure a snapshot of all untracked files in your current project is being added to your local Git repository.

If you edited something without staging it, and you want to get rid of it, use

```
git clean
```

to revert your editing. 

Commit to make a snapshot of your work
---
Contents which have been staged must be committed to produce a snapshot of your current work. Any commit is self-contained, it does not only reference your current changes, but everything which makes up the state of your current project at the time you are committing. This is because each commit contains a pointer to its direct predecessor, the parent commit. Beginning at the last commit, the tip, the list of commits is a sequence pointing to the past, defining your entire project at the current time.

```
git commit [-a] [-m "your commit message"]
```

`-a` is a nice shorthand option to even stage content which has been modified or deleted without a previous `git add` command. New contents still need to be staged with the `git add` command. With `-m "your commit message"` you tell your co-workers and probably yourself why you made the commit.

An even shorter form of committing in that case is:

```
git commit -am "your commit message"
```

Here the option to stage modified and deleted contents and the option to provide a commit message are combined in `-am`. You can combine multiple options in a single one like here, the only restriction is that only the last option can take an argument, like the commit message. 

If you don´t specify a commit message when firing the commit command, an editor will be opened where you have to provide the message. You can configure what editor to use with 

```
git config --global core.editor <editor-name>
```

[GitHub](https://help.github.com/articles/associating-text-editors-with-git/) provides a brief guide to setting up several editors. To see the currently configured editor, type

```
git config [--global] core.editor
```

To see the history of commits use

```
git log
```

The output of a `git log` can be filtered and formatted. For example `git log --oneline` will display most recent commits organized into one single line per commit. 

`git log <branch-name> --oneline` will display most recent commits in the specified branch, organized into one single line per commit.

A free formatting of the `git log` output can be achieved with 'git log --prett="<your format string"`. A list of available formatting options is on [GitHub](https://git-scm.com/docs/pretty-formats).

The commit message
---
A ```git log``` of commit messages should give an idea how the project has evolved over time. Each message explains *what* has been accomplished or changed with the commit. The message should describe a whole idea of completed work [[Westby 2014]](https://24ways.org/2014/dealing-with-emergencies-in-git/). Don´t describe *how* the change was accomplished - that´s in the code.

A properly formed commit subject line should complete the following sentence:

> If applied, this commit will "your subject line"

The commit messages reveals whether a committer is a good collaborator or not.

Because in the output of a ```git log``` is not much space to display text and we do not have time to read through many sentences to understand what a commit was about, as a rule of thumb, the subject of the commit message should contain one line and 50 or less characters. Start the subject with a capital letter and do not end with a period. 

If more explanation is needed, let the subject be followed by a blank line and then write the body of the commit message, wrapped at 72 characters per line, as Git will not wrap text automatically. Explain *why* the commit was made, again, not *how*. [[Beams 2014]](http://chris.beams.io/posts/git-commit/#separate)

Removing files
---
To remove a file from the working copy and from the staging index, use

```
git rm <pathspec>
```

`<pathspec>` describes the file or even files (wildcards allowed), which should be deleted. `git rm` will remove the file in your working copy and will stage the remove, so that the removal can be committed in a subsequent commit. If you forgot to use `git rm` at first hand and instead removed the file with your usual remove command in the shell, the file will be removed from the working copy, but not from the staging index. In that case you can even call `git rm <pathspec>` afterwards, in order to have the file be removed from the index, as it is already removed from the file system.

Renaming files
---
If you rename a file in your command shell with `mv a.txt b.txt`, it will produce a similar situation as if you would remove a file with just the shell command `rm a.txt` and creating a new file `b.txt`. Git would still try to keep track of `a.txt`. To fix this, you would have to

```
git rm a.txt
git add b.txt
```

Or, use the suitable Git command right from the start:

```
git mv a.txt b.txt
```

Ignoring files
---
If some files in your project should be ignored by Git, for example because

* the files are automatically created by a process belonging to your project, 
* the files contain credentials or
* the files are anyway downloaded by package managers,

you can specify patterns inside of the `.gitignore` file to exclude these from Git version control. The `.gitignore` usually is in the root of your Git project.

As an example, for a [Jekyll](http://jekyllrb.com) web site project, your `.gitignore` may contain

```
_site
.sass-cache
.jekyll-metadata
```

The `.gitignore` file itself should be under version control - so be aware of not putting `.gitignore` as a pattern into the `.gitignore` file.

Branch to isolate
---
Any contents in Git must be in a branch. The first branch of a Git repository is the master branch. Technically it is a branch like all other branches, but conceptually it is the primary, stable version of whatever is stored in the repository. 

A commit will always be done inside of a particular branch. But while commits point to the past, a branch is a concept for the future. A branch is a virtual copy of your project, where commits can be made freely in isolation from whatever else may happen in the repository. You would make a branch to experiment with some new feature inside of your project, to fix a bug, develop a new feature or to do other things which you want to have separated from everything else until you have truly found what you are after in your branch. 

While you can have multiple branches in your repository, there is always exact one working branch in your repository, which is the one you are currently working on. Any commit you make, will be against the working branch.

```
git branch <branch-name>
```

will create a new branch for you. Choose a short descriptive branch name.

`git branch <branch-name>` will not make the new branch your current working copy, therefore your next commit would not be against the new branch. In order to make the new branch the active working copy, you need to

```
git checkout <branch-name>
```

after you have created your branch. Whatever you commit from that point on will be inside of your new branch and nowhere else.

Again, there is a shorthand command for creating a branch and making it the current working copy all at once:

```
git checkout -b <branch-name>
```

will create a new branch and make it the current working copy.

```
git branch
```

will show you the current list of branches with a `*` in front of the new created and now active branch.

To see the history of commits in a branch-oriented tree format, use

```
git log --graph --oneline
```

The `--graph` option will produce the branch tree and the `--oneline` option leads to each commit being displayed in a single line of the tree structure.

Sometimes you want to remove a branch, e.g. after all work is done and the branch has been merged into the master. In order to go ahead, use

```
git branch -d <branch-to-delete>
```

to remove your branch. A rename of the current local branch can be achieved by

```
git branch -m <new-branch-name>
```

Merge to include
---
Sometimes the work which has been done in a branch will be thrown away. You delete the branch and everything is as if the branch never existed. If you don´t want to throw away your work, you probably have to bring the contents of your branch into the master branch. That´s what merge is for. All commits that have been made in your source branch have to be merged into your master branch.

To merge any branch into your master branch, you have to

```
git checkout master
git merge <source-branch-name>
```

The first command will bring you into the master branch, the second command will pull in the changes from the source branch into the master branch. The principle is always the same - make the branch into which you want to merge the working copy and then pull changes from any other branch into your working copy by

```
git checkout <destination-branch-name>
git merge <source-branch-name>
```

To be more precise, all commits from your source branch will be merged into your working copy, which is the checked out branch.

The simplest kind of merge is, if nothing had been changed in the destination branch while you were working inside of the source branch. In this case any changes made in the source branch will entirely be added to the destination branch, which is called *fast-forward*. The tip (last commit, or head commit) of the destination branch and the tip of the source branch will point to the same commit then, which is the last commit that was made in the source branch. After that, both branches, the source branch and the destination branch, are identical except in their branch names.

A *true merge* is something different. That´s when both, the source branch and the destination branch, have been modified before merging. A fast-forward then is no longer possible and Git has to figure out the combined state of the content, wich will lead to a so called *merge commit*. Starting at the head commits of each branch, Git will search back for the first common ancestor of both branches. This common ancestor is then used as a reference point to determine what has been changed in what order in each branch. Each changed file in each branch is compared against the reference point. When Git identifies a line that has changed in either branch, that line is carried forward for inclusion in the destination merge. As long as the branches don´t both contain changes to the same line, Git will merge and commit automatically with a generated commit message: 

```
Merge branch '<source-branch-name>' into '<destination-branch-name>'.
```

Unlike a normal commit, which has one parent commit, a merge commit has two parent commits. 

<mark>Image of merge commit</mark>

Now when two modified lines of the same file are overlapping during a merge, a *merge conflict* occurs. Git can not automatically solve this conflict. Instead Git indicate the conflict in the console

```
CONFLICT (content): Merge conflict in <conflicting-file-name-in-destination-branch>
Automatic merge failed; fix conflicts and then commit the result.
```

and put a *conflict marker* into the file of the destination branch, indicating the conflicting lines.

```
<<<<<<< HEAD
  <conflicting content line in destination-branch (the current working copy)>
=======
  <conflicting content line in source-branch (the you tried to merge in)>
>>>>>>> <destination-branch-name>
```

To resolve the conflict, this entire section, including the angle brackets, needs to be edited and refactored into the final version you want to see in the file. After that, you can commit the merge with

```
commit -am "your merge commit message"
```

Working with remotes to share with a team
---
The Git working mode is offline by default. This is nice because you don´t need to have an account to sign in somewhere, you just can start working with your repository. 

A remote to Git is a physical copy of a repository. It may be on the same computer as the repository it was copied from (copying is named *cloning* in Git) or on a different computer far away. The essential part is, you can exchange data between the two repositories and keep them synchronized. Usually a remote repository is placed on a server which is accessible by your team. Any new teammate initially will clone the repository from the server to his or her local machine. The Git name for this remote repository is usually *origin*. The origin has nothing special and is not distinct from the local repositories on the machines of each team member, except only by convention it is used as a hub to which the team members connect to synchronize their work with all others. This will happen in a way that team members are working locally on their own computers and eventually synchronize with the remote repository on the hub server by *pulling* and *pushing* committed content.

<mark>Embed image of hub remote concept</mark>

Remote repositories are usually *bare* repositories, they have no staging area and no working copy like local repositories, because no one is working directly on the remote repository. To indicate a bare repository usually ```.git``` is being appended to the name of the repository.

A remote may be on [GitHub](https://github.com) or on a self-hosted system you want to use as a hub.

Clone a remote repository to local
---

On your local machine move to the folder under which the remote repository should be cloned 

```
cd /path/to/parent/
```

Then clone the remote repository into the parent 

```
git clone <repo> [<new-folder-name>]
```

`<repo>` is the path to the remote repository and has one of the following structures, each standing for a different protocol:

```
/path/to/repo.git
ssh://[user@]host.xz[:port]/path/to/repo.git
git://host.xz[:port]/path/to/repo.git
http[s]://host.xz[:port]/path/to/repo.git
```

The first protocol is the *local* protocol. This is useful if the remote repository will reside on a shared filesystem to which every team member has access. The other protocols are obviously *ssh, git* and *http*. To learn more about these, please refer to ["Git on the server - the protocols"](https://git-scm.com/book/tr/v2/Git-on-the-Server-The-Protocols).

`<new-folder-name>` is the optional folder name of the cloned project on your computer.

Once you have cloned the remote to your computer, Git already configured the *origin* for your project. You can check that by

```
cd /path/to/parent/<repo>
git remote -v
```

which will display the *fetch* and *push* addresses being bound to the symbolic name *origin*.

Push data to remote
---

If you are working on your local project and committed your changes to a branch you want to bring to the remote repository now, the general Git command format is

```
git push <remote> <remote-branch-name>
```

This will push the contents of the local branch, your current working copy, into the `<remote-branch-name>` on the remote repository.

Assuming you worked on a branch named *lazyload* and are currently on that local branch, your command is

```
git push origin lazyload
```

Remote repositories do not have working copies or staging areas and no humans who will resolve merge conflicts. Therefore, if you push to a remote and Git can not merge with a simple *fast-forward*, the push will be rejected by Git. The situation needs to be fixed by pulling down the changes from the remote and then trying to push again.

The local branch names and the remote branch names are not related in Git. Even though they share the same name, Git doesn´t know that they logically represent the same piece of work. Therefore in each push you have to tell Git to what branch on the remote you want to push. You can configure each local branch of your Git to *track* its remote counterpart. Once you have done it for a branch, you can push and pull against the remote just by typing `git push`and `git pull` without further specifying the remote and remote branch name.

```
git push -u origin lazyload
```

or, generally

```
git push -u <remote> <remote-branch-name>
```

`u`, alternatively `--set-upstream`, is the option which will set up the tracking relationship between your current local branch and the remote branch. You only need to do it once per local branch.

A very specific case of pushing is to remove a branch from the remote, as the removing of local branch doesn´t remove the branch on the remote. The command goes

```
git push origin --delete <remote-branch-name>
```

Pull data from remote
---

If you want to get the latest changes, e.g. from the *lazyload* branch on the remote repository, into your local branch, call

```
git pull origin lazyload
```

or, in general

```
git pull <remote> <remote-branch-name>
```

Git will automatically merge the remote changes into your local branch. In case of a merge conflict, resolve the conflict marker in your local branch, stage and commit your change and push then to the remote.

The big picture
---

Command reference
---

todo
---
* Meaning of HEAD
* git diff

References
---
[Demaree 2016] D. Demaree, “Git for Humans”, A Book Apart, 2016, [https://abookapart.com/products/git-for-humans](https://abookapart.com/products/git-for-humans)

[Beams 2014] http://chris.beams.io/posts/git-commit/

[Westby 2014] https://24ways.org/2014/dealing-with-emergencies-in-git/

https://rogerdudler.github.io/git-guide/index.de.html

http://blog.osteele.com/posts/2008/05/my-git-workflow/

