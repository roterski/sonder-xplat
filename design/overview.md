user {
  can {
    [x] login {
      [x] with facebook
      [ ] with email and password
    }

    [-] create post {
      [x] has {
        title
        body
      }

      [ ] as {
        profile
        anonymous
      }
    }

    [x] read posts {
      [x] own {
        can {
          
        }
      }
      [x] other's {
        can {
          [ ] up/down vote
          [x] create comment
        }
      }
    }

    [ ] create groups {
      as group owner {
        can {
          set group rules

          invite people
        }
      }
    }

    [ ] join groups {
    }
  }
}

