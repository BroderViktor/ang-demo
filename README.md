
# You pushed to main?

If you pushed to main, then you should reset to origin/main

--hard will REMOVE/DELETE your commits!!!!!!

```bash
git fetch origin
git reset --hard origin/master
```

If you want to keep your commits, then use --soft

```bash
git fetch origin
git reset --soft origin/master
```

If you want to keep your commits, but you want to revert a commit, then use revert

```bash
git reset --soft HEAD~1
```

If you want to keep your commits, but you want to revert a commit, then use revert

```bash
git revert <commit_to_revert>
```
