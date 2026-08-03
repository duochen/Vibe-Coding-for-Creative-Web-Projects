# Teacher Guide: Netlify Deployment Lab

## Recommendation
Use Netlify for this first deployment lesson. Current Netlify documentation supports dragging a folder containing HTML files into Netlify Drop and returning a shareable `netlify.app` URL. Vercel also has a no-Git drop workflow, but Netlify's manual drag-and-drop flow and update path are especially straightforward for a first static-site lesson.

## Alignment with Lesson 9 workbook
The lab deliberately follows the workbook sequence:
1. Explain deployment.
2. Test before demo day.
3. Identify the core feature and demo flow.
4. Fix or document one small issue.
5. Prepare a live link and backup.
6. Practice a short demo.

## Suggested 75-minute class plan
- 0-8 min: Explain local versus live and show the three files.
- 8-18 min: Students run the local testing checklist.
- 18-30 min: Teacher models one folder upload.
- 30-42 min: Students deploy and partner-test links.
- 42-57 min: Students make one controlled customization.
- 57-65 min: Redeploy the updated folder.
- 65-73 min: Practice the two-minute demo.
- 73-75 min: Exit ticket and backup check.

## Classroom management
- Test school network access to Netlify before class.
- Decide whether students use individual accounts, pairs, or teacher-managed deployment.
- Never ask students to publish personal information.
- Have students use project nicknames rather than full legal names.
- Keep an unmodified copy of `deploy-this-folder` available for recovery.
- Pair students as Driver and Navigator, then switch roles after deployment.

## Assessment rubric (20 points)
- Local testing completed: 4
- Correct folder deployed and live URL works: 5
- One safe customization and redeploy: 4
- Live testing plus known issue: 3
- Demo flow and backup plan: 4

## Expected known issue
XP uses browser localStorage. It does not sync between devices or browsers. This creates a helpful discussion about the difference between a static frontend and an app with accounts/database storage.

## Extension ideas
- Add a new energy category.
- Add accessibility improvements.
- Add a Reset Progress button.
- Use GitHub in a later lesson to introduce version control and automatic deployment.
