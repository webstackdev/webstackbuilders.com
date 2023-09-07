---
title: "Template"
slug: division-15
date: 2021-03-31
tags: code
---
# Specialty Job Board

**[previous case study link] [all case studies link] [next case study link]**

**[Header Image]**

## The Client

![image-20230705025030833](images/division-15/image-20230705025030833.png)

The client specializes in mechanical division commercial construction, and provides support services to manufacturers, contractors, and manufacturer’s representatives. Client sought to monetize job referrals they were distributing with paid placement in their industry newsletter (40,000 subscribers), and expand the offering with an applicant tracking system and other job board features.

**Location:** Chicago, Illinois
**Industry:** Construction
**Timeline:** June 2017 to December 2018


## The Challenge

Webstack Builders was tasked with getting an MVP into production in eight weeks, and then progressively enhancing the product in two week sprints until the full specification was met. The initial roll-out included company pages for prospective employers, job listings, an application system for job seekers, and a jobs portal for job seekers to manage their applications.

Further work included a resume builder for job seekers, an applicant tracking system for employers, question and answer pages, and a "connector" role and portal to financially reward third parties who were able to introduce qualified candidates to employers and that resulted in a hire.

## Requirements

- Provide  a branded company profile page that includes their logo, company  information, website, images, videos, and all active jobs posted for employers. Employers can invite and manage team members with configurable permissions for posting jobs and managing applicant workflows.
- Enable job seekers to save jobs, so that they can refer back to them when they have time to finish an application. Provide a job seeker portal for applicants to track their progress in employer tracking workflows. Enabling login using job seeker's LinkedIn, Facebook or Google accounts. Provide job search features and job alerts via email.
- Provide an employer dashboard providing tools to manage posted jobs, view applications, and view analytics. Manage subscription settings and posting reloads with billing options for PayPal and Stripe.
- Implement an Applicant Tracking System with kanban-style application workflow. Allow configurable workflows with integration to third party credit reporting and background check vendors.

**[3 Screen Shots in Carousel]**

## The Solution

Webstack Builders initially performed consultation on project architecture, including using off-the-shelf solutions. Given the project complexity and in-house IT experience with managing PHP applications, the client decided to launch a greenfield project built on Laravel and React. The project team consisted of one full time developer, a part time graphic designer, a part time content writer with industry experience, and administrative help for user testing.

#### Resume Builder

The resume builder component allowed site administrators to add industry-specific templates, and to output resumes in a standard ATS-compatible format for use within the job board and for applications to backfilled jobs on other job boards. Resumes could be populated from job seeker's LinkedIn profiles automatically. Provided spell checking.

#### Subscription Module

Employers were billed on a recurring monthly basis for packages that offered a set number of job posting, and one-off refill packages for additional postings. The subscription module integrated with PayPal and Stripe for billing, and also featured update-able product pages for promotions and packages.

#### Job Backfill

 Job backfills from larger sites were imported nightly to maintain a larger inventory of job postings. A polling mechanism for importing industry-standard XML postings from third-party job sites was built. The job backfill module included a revenue share tracking system with analytics for use by the client's A/P department.

#### Third-Party Integrations

Integrations provided with Algolia for search, Mailchimp for alerts, registration workflow, and marketing emails, and a Facebook app for displaying job postings.

## Tools & Technologies

- Laravel
- React (CRA) / Redux
- Styled CSS
- Facebook SDK for PHP
- PostgreSQL
- Jenkins
- ArgoCD

## The Results

### Client's Benefits

The result of the project was a job board and application tracking system that exceeded all client specifications, and was completed in eighteen months. Within three months, the job board had 130 paid postings, and the backfill feature for postings from Indeed also contributed to revenue. Employers found the application tracking system features easy and intuitive to use, and were enthusiastic about the future of the platform.

The client plans to add additional features, like certification verification, skill assessments, and background checks. The integration with Facebook that promoted job postings on the client's Facebook page led to more than a 400% increase in followers for the channel due to cross-posts from their page and search traffic. The company believes that an uptick in overall revenue for the business is a result of additional free brand awareness due to the increased reach of their social media marketing efforts.

## Similar Project Idea? Discuss It With Us!

[Button to Contact Page]