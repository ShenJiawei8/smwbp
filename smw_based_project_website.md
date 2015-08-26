# Introduction #
There are few efforts, if any, on building a open source and community supported project website. While content management systems (CMSs) can be customized for project, they are typically quite restricted. While they can provide 80% features for a project website, it is typically quite hard to add more features to them because of their rigid database schema. Semantic Mediawiki offers flexible relational modeling capability to enable smooth integration of predefined common database scheme and project-specific customization. In this project, we would like to realized this approach and share our experiences.


# System Development #
In what follows, we adopt software engineering process to develop the SMW-based general purposed project website.

## Requirements Phase ##
**data requirements**
> class hierarchy
  * thing
    * project (description, key concepts, broad design)
    * document
      * publication
      * presentation
      * news
      * faq
      * use\_case
      * design document?
    * software
    * dataset
  * agent
    * community
    * people
    * organization
  * event
    * meetings
    * conference

**UI requirements**
> originally 'section'
    * project
    * data
    * community
      * people
      * data provider


**performance requirements**

### Use Cases ###

## Design Phase ##
principles:
  * focus on frequently used concepts, but allow extension (adding new attribute, new class)

### Data Organization ###

### User Interaction ###

### Technology Stack ###

## Implementation Phase ##


# Task Management #