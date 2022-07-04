---
title: 'Understanding Docker'
slug: understanding-docker
tags: code
date: 2021-04-15
---

# Understanding Docker

The idea of this is to make Docker easier to understand by tracing its origin in chroot, through jails, and up to the modern container variant

Write based on some readers being Windows people unfamiliar with \*nix

Explain kernel being in its own castle, and that world is standard libraries/ programs common to different \*nix distros, and how POSIX standardizes that. And what a program is: ELF header, or an interpreter (and so each script file isn’t really a “program” or executable).

If you just install a program, all you need to do is place a binary executable file that has a specific format somewhere in the file system, and set its file system flags to executable. That executable will have access to everything in the system that the user who launches it has - which if you execute it as root is everything. Some programs need root privileges (like Apache to get a network port in the protected range), so a common way to provide some security is to have a small program that does the actions requiring root, and then launches the main program under a more restricted user. Even then the more restricted user likely has access to at least seeing large parts of the file system and system information.

1. To get around any arbitrary program being able to harvest data about the system (which is useful information to a hacker), people used a utility called chroot to launch programs. This utility changes the root of the file system from the perspective of the program: instead of seeing its cwd (current working directory) as e.g. /opt/bin/someprogram (and being able to walk around the filesystem from there), it would see its cwd as simple /. The admin setting this up would have to symlink in any necessary shared libraries or utilities to the subdirectory the program sat in (or provide duplicates if you didn't want the program to use the system-level libraries or utilities). You often had to provide the program fake pseudo-directories as well, like /proc.
2. FreeBSD took the idea of chroot and extended it, calling it "Jails". Linux adopted the same idea although it wasn't as conveniently packaged (the same is true about file system utilities: Linux is a hodge podge of different utilities to encrypt a disk, create mirrors, and the like, where it's all unified in a consistent framework on FreeBSD). Jails added the ability to control the resources that a process running in them could consume (CPU, memory, network, etc.). They also took a lot of the pain out of faking an environment for the process. But they were still a PITA to symlink or create the libraries and utilities the program might need to run.
3. Docker took the Jail idea to the next level. It provided a really convenient way to provide the libraries and utilities a program needs to run (the Docker image) and even packaging the whole thing up (program included) for distribution. It also provided a configuration scheme so instead of having to start the program up with a jail start myprogram --lots --of --command --line --options it was a consistent syntax to start any container.
   Important things about Docker containers:
   (1) they can only run (and are only designed to run) a single process. Following their evolution from chroot should make clear why. There is a little twist in that, in that when they're used in Kubernetes each container also has a proxy running in it (the "sidecar"), which is actually what's started and it in turns starts your program. K8s does that because it needs the proxy to allow all of it's DNS-like services: autodiscovery of network infrastructure and the like.
   (2) the process of building images for containers is a little screwy, because they're trying to avoid having to pull enormous full images of OSs constantly and the bandwidth / resources it takes to provide that. So images are built in layers and the way Docker does it really isn't the easiest to grasp (you can create an enormous number of layers unintentionally if you don't structure your arguments correctly). But it's worth it to avoid bandwidth overrages on your servers from pulling complete images.

4. Explain Docker, starting with:

How Linux works with a single root directory, everything's-a-file, and user / group permissions for access control. The problem this causes with access to world-readable system files like /etc/passwd and /etc/group, need for shadow password file.

How chroot works, by moving the root to a different spot in the file hierarchy. Including only system files a process needs to run in that chroot and different ones than the real ones maybe.

FreeBSD Jails and how Linux moved towards them with resource controls

Docker is just a portable Jail
