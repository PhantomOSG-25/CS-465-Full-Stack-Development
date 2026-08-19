# Attribution and Contribution Scope

Travlr Getaways began as a Southern New Hampshire University CS 465 full-stack development project built from a fictional client scenario.

## Course foundation

The client scenario and portions of the initial application scaffolding originated in the course materials. They provide the academic context and are not presented as an independently commissioned product concept.

The course-provided website template, static pages, logos, decorative graphics, photographs, and sample prose are not included in this maintained portfolio version.

## Student implementation and maintenance

Michael B. Wood's work includes completing and integrating the Express application, Handlebars site, MongoDB/Mongoose data layer, REST controllers and routes, authentication flow, JWT authorization, and Angular administrative client.

The maintained portfolio version also includes:

- environment-based database, origin, API, admin-client, and JWT configuration
- strengthened password hashing and timing-safe comparison
- fail-closed JWT configuration
- protected administrative API and Angular routes
- corrected seed-data parsing and path handling
- consistent trip-code behavior across edit and delete flows
- observable-based login completion instead of timing-based redirection
- plain-text trip descriptions to avoid rendering stored markup
- original responsive public-site and admin-client presentation
- original demonstration copy and updated seed records
- automated checks, continuous integration, architecture notes, and security documentation

## Portfolio imagery

The four travel photographs in `public/images` were generated specifically for this maintained portfolio version with OpenAI's image-generation workflow in August 2026. Three optimized copies are also included with the Angular client so its local build remains self-contained. The generation prompts and usage are recorded in [docs/VISUAL-ASSETS.md](docs/VISUAL-ASSETS.md).

## Third-party dependencies

Open-source dependencies are declared in the npm manifests and remain subject to their respective licenses. Generated dependency folders are not committed.

No repository-wide software license has been added. The academic origin and contribution boundaries should be considered before granting reuse rights.
