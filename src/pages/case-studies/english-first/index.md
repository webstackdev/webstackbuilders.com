---
title: "Webstack Builders Corporate Website"
slug: english-first
date: 2021-03-31
tags: code
---
# Managing an LMS Implementation

**[previous case study link] [all case studies link] [next case study link]**

**[Header Image]**

## **The** Client

![image-20230705025303654](images/english-first/image-20230705025303654.png)

Development of a learning management system to smoothly manage academic operations and capture teacher work product in a central knowledge base

**Location:** Lucerne, Switzerland
**Industry:** Education
**Timeline:** January, 2016 to July, 2017

## **The** Challenge

The client wanted to develop a web-based Learning Management System to provide additional learning opportunities for students beyond scheduled classroom hours, and allow them to build an inventory of reusable teaching materials created by contract instructors in preparation for their lessons.

Their requirements included a catalog of branded worksheets, online proficiency tests with audio recording that could be graded by remote contractors, and a lesson plan library that included searchable audio/visual materials in a variety of formats. Performance of the site with many concurrent users, and easy branding and deployment for regional branch offices, was a criteria for project success.

## Requirements

- Provide a great user experience for students, contract instructors, and administrators with a rich feature set required to deliver effective educational planning and delivery.
- Increase student interaction with the system outside of in-person instruction by providing gamification features including badges, points, leaderboards, student competitions, and skill/certification tracking.
- Provide a course builder tool that ensures lessons plan meet standards for structure and content, and provides analytics for instructor performance monitoring. Provide the ability to drag, drop, and arrange content into place, making it easy to create lesson plans and courses.
- Store, index, and distribute instructor-generated presentations, documents,  graphics, audio, and video for lesson plans. Dynamically generate PDF files for offline learning. Generate metadata XML and export educational materials in SCORM format (a zip archive for e-learning system data exchange) for use in other e-learning platforms used by the client.
- Authenticate student and instructor accounts with client's existing student enrollment ERM and HR system via XML-SOAP. Provide "teaser" materials in a course structure for free students, and ensure continued availability of paid-for content to students after their enrollment has ended.

**[4 Screen Shots in Carousel]**

## **The** Solution

The client's existing regional websites were all based on the Joomla! MVC framework. Many local offices had made extensive *ad hoc* modifications to the platform, including event scheduling systems for classroom lessons, adding discussion forums for instructor use, local language blogging integrations with social media for content marketing, and instructional material download capabilities for students with various degrees of access control.

Webstack Builders deployed the Moodle LMS system with a bridge to Joomla!, integrating the two platforms and keeping existing infrastructure in place. In total, two dozen custom extensions to both platforms were developed and deployed. Roll out was incremental, with a basic system deployed in four months alongside a website refresh, and additional features and deployment sites over the next fourteen months. The main subsystems were:

#### Course Builder

A heavily customized authoring tool that allows adding educational materials to the system,  registering, and categorizing them depending on requirements set by local branches. Included editorial approval workflows, export to interchangeable e-learning archives, and integration with Akamai SDN for distribution.

#### Instructor Dashboard

Integrated instructor calendars as a work scheduling tool with Joomla! event calendaring and the ability for instructors to register mobile devices for schedule change notifications. Overview of student progress through various participation and course goals.

#### Student Portal

Customized entry point for students to view the courses they have enrolled in, the status of their courses, assessments they need to take to complete a course and earn a badge or certificate, and to take standardized tests in-office including audio recording and timing controls.

#### Centralized Analytics Dashboard

Bespoke dashboard allowed administrators to view student and instructor progress metrics using multiple facets, course status, manage approval requests for schedule changes and lesson plan submissions, push notifications to students for upcoming and suggested courses, and assign test assessments to instructors.

#### Messaging System

Allowed managed communications between students, instructors, and administrators, while ensuring safety standards are met and revenue-generating work is kept within the business.

#### Authentication and Authorization

User management and authentication was integration with client's existing back-end systems using LDAP and SOAP.

#### Hosting

The client's existing infrastructure was provided from dedicated servers in leased racks at a European ISP. Procured and deployed additional servers to handle the new systems and functionality.


## Tools & Technologies

- Joomla!
- JQuery
- BackboneJS
- Bootstrap
- MySQL
- Jenkins
- Sabre CalDAV
- OpenLDAP
- RHEL


## **The** Results

The easy-to-use and well planned online learning platform was much more popular with both instructors and students than English First originally projected. In the first two quarters after launch, the client's instructors produced nearly **three thousand hours** of course plans that they were able to repurpose throughout their network of schools. Capturing that work output allowed it to be incrementally improved, rather than instructors reinventing the wheel with every class. A survey among students at the six month mark showed that students of the language schools nearly all indicated that the quality of course content had **significantly** improved.

The client's students also benefited by increasing their proficiency scores at established waypoints by 27% compared to testing at the same waypoints before the platform was deployed. Language instruction in the markets English First operates in is highly competitive. The quicker pace of learning by means of access to more and focused materials and interactions means that student are more willing to recommend the business to others, and continue with the same school to reach higher fluency levels or study other languages.

## Similar Project Idea? Discuss It With Us!

[Button to Contact Page]