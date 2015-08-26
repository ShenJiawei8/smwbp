# Preface #
  * Contributors: Li Ding, Jie Bao, Evan Patton, Jin-guang Zheng, Rui Huang
  * Last Modified: Jan 20, 2009
  * Version: 0.2

# Scope #
This project will cover the following
  * MediaWiki (MW)
  * Semantic MediaWiki (SMW)
  * Frequent MW and SMW extensions
  * Semantic MediaWiki Plus (SMW+, known as Halo Extension )
  * SMWBP (a set of wiki pages, including templates, forms)

This project aims at the following services
  * to facilitate wiki installation via canned shell scripts
  * to support learning wiki via tutorials
  * to facilitate SMW annotation via templates from SMWBP

# Design Principles #
  * most wiki articles can be categorized as one of the following: thing, class, property
  * a typical wiki article contains the following:
    * free text (as regular wiki page) with SMW annotations
    * an infobox template (backed by a semantic form for WYSWYG editing style)
    * a SMW factbox (SMW native features)
  * user can edit SMW content using template as well as SMW+