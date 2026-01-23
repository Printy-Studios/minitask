---

id: update-command
priority: undefined
status: done

---

# # update-command




An update command should be added that allows you to modify an issue's properties,
for now that would be `status` and `id`. For this we shall create a utility function
`updateIssue()` which will optionally take any property (except metadata.id which would be required
to identify the issue) of an issue object and update the corresponding properties
in the respective issue's file.

